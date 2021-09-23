package controllers

import (
	"backend/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetUserByUsername(c echo.Context) error {
	username := c.Param("username")
	user := &models.User{}
	err := DB.Model(user).
		Where("username = ?", username).
		Select()

	if err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, user)
}

func GetUserByUserId(c echo.Context) error {
	userId := c.Param("id")
	user := &models.User{}
	err := DB.Model(user).
		Where("id = ?", userId).
		Select()

	if err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, user)
}

func ToggleFollow(c echo.Context) error {
	userIdWhoWantsToFollow := c.Param("id")
	userWhoGetsFollowedOrUnfollowed := c.FormValue("id")

	updateLoggedInUserFollowing(userIdWhoWantsToFollow, userWhoGetsFollowedOrUnfollowed)
	updateFollowedUserFollowers(userWhoGetsFollowedOrUnfollowed, userIdWhoWantsToFollow)

	return c.JSON(http.StatusOK, echo.Map{"followed": true})
}

func updateLoggedInUserFollowing(id string, followerId string) {
	user := &models.User{}
	err := DB.Model(user).
		Where("id = ?", id).
		Select()

	if err != nil {
		panic(err)
	}

	for idx, following := range user.Following {
		if following == followerId {
			user.Following = append(user.Following[:idx], user.Following[idx+1:]...)
		} else {
			user.Following = append(user.Following, followerId)
		}
	}
}

func updateFollowedUserFollowers(id string, followingUserId string) {
	user := &models.User{}
	err := DB.Model(user).
		Where("id = ?", id).
		Select()

	if err != nil {
		panic(err)
	}

	for idx, follower := range user.Followers {
		if follower == followingUserId {
			user.Followers = append(user.Followers[:idx], user.Followers[idx+1:]...)
		} else {
			user.Followers = append(user.Followers, followingUserId)
		}
	}
}
