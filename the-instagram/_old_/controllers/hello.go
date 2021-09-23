package controllers

import (
	"backend/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

func Test(c echo.Context) error {
	user := &models.User{
		Username: "sidm2",
		Name:     "sidharth",
		Password: "sidm2",
		Email:    "sidm2",
	}

	res, err := DB.Model(user).Insert()

	if err != nil {
		panic(err)
	}

	return c.JSON(http.StatusCreated, res)
}
