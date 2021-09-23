package controllers

import (
	"backend/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetAllPostsByFollowers(c echo.Context) error {
	userId := c.Param("id")

	user := &models.User{}
	err := DB.Model(user).
		Where("id = ?", userId).
		Select()

	posts := &models.Posts{}

	for _, following := range user.Following {
		post := &models.Post{}

		err := DB.Model(post).Where("user_id = ?", following).Select()

		if err != nil {
			panic(err)
		}
		posts.Post = append(posts.Post, post)
	}

	if err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, posts)
}

func PostComment(c echo.Context) error {
	id := c.Param("id")
	post := new(models.Post)
	err := DB.Model(post).
		Where("id = ?", id).
		Select()

	if err != nil {
		panic(err)
	}

	comment := &models.Comment{}
	post.Comments = append(post.Comments, comment)

	res, err := DB.Model(post).Set("comments = ?", post.Comments).Update()

	if err != nil {
		panic(err)
	}
	return c.JSON(http.StatusAccepted, res)
}

func LikeOrUnlikePost(c echo.Context) error {
	id := c.Param("id")
	userId := c.FormValue("user_id")
	post := new(models.Post)
	err := DB.Model(post).
		Where("id = ?", id).
		Select()

	if err != nil {
		panic(err)
	}

	for idx, whoHaveLiked := range post.Likes {
		if userId == whoHaveLiked {
			post.Likes = append(post.Likes[:idx], post.Likes[idx+1:]...)
		} else {
			post.Likes = append(post.Likes, userId)
		}
	}
	return c.JSON(http.StatusOK, post.Likes)
}
