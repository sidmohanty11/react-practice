package controllers

import (
	"chat/models"
	"net/http"

	"github.com/labstack/echo/v4"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func (h *Handler) CreateRoom(c echo.Context) (err error) {
	u := &models.User{
		ID: bson.ObjectIdHex(userIDFromToken(c)),
	}

	r := &models.Room{
		ID: bson.NewObjectId(),
	}

	if err = c.Bind(r); err != nil {
		return
	}

	// Find user from database
	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB("convo").C("users").FindId(u.ID).One(u); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}
		return
	}

	u.Rooms = append(u.Rooms, r)
	if err = db.DB("convo").C("users").UpdateId(u.ID, u); err != nil {
		return
	}

	// Save message in database
	if err = db.DB("convo").C("rooms").Insert(r); err != nil {
		return
	}

	return c.JSON(http.StatusCreated, r)
}

func (h *Handler) FetchRoomMessages(c echo.Context) (err error) {
	roomName := c.Param("name")

	db := h.DB.Clone()

	room := &models.Room{}

	if err = db.DB("convo").C("rooms").Find(bson.M{"room_name": roomName}).One(&room); err != nil {
		return
	}

	defer db.Close()

	return c.JSON(http.StatusOK, room)
}

func (h *Handler) GetRooms(c echo.Context) (err error) {
	rooms := []*models.Room{}

	db := h.DB.Clone()

	if err = db.DB("convo").C("rooms").Find(bson.M{}).All(&rooms); err != nil {
		return
	}
	defer db.Close()

	return c.JSON(http.StatusOK, rooms)
}
