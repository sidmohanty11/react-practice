package controllers

import (
	"chat/models"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/pusher/pusher-http-go"
	"gopkg.in/mgo.v2/bson"
)

func (h *Handler) CreateMessage(c echo.Context) (err error) {
	m := &models.Message{
		ID:        bson.NewObjectId(),
		Timestamp: bson.MongoTimestamp(bson.Now().Unix()),
	}

	if err = c.Bind(m); err != nil {
		return err
	}

	// Validation
	if m.From == "" || m.To == "" || m.Message == "" || m.RoomName == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid to or message fields"}
	}

	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	pusherClient := pusher.Client{
		AppID:   os.Getenv("PUSHER_APP_ID"),
		Key:     os.Getenv("PUSHER_APP_KEY"),
		Secret:  os.Getenv("PUSHER_APP_SECRET"),
		Cluster: "ap2",
		Secure:  true,
	}

	data := echo.Map{"message": m}
	pusherClient.Trigger("my-channel", "my-event", data)

	// Find user from database
	db := h.DB.Clone()
	defer db.Close()

	r := &models.Room{}

	if err = db.DB("convo").C("rooms").Find(bson.M{"room_name": m.RoomName}).One(r); err != nil {
		return echo.ErrBadRequest
	}

	r.Messages = append(r.Messages, m)
	if err = db.DB("convo").C("rooms").UpdateId(r.ID, r); err != nil {
		return
	}

	return c.JSON(http.StatusCreated, m)
}
