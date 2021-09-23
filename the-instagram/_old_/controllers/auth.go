package controllers

import (
	"backend/helpers"
	"backend/middlewares"
	"backend/models"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func Register(c echo.Context) error {
	user := &models.User{}
	if err := c.Bind(user); err != nil {
		return err
	}

	hash, err := helpers.HashPassword(user.Password)
	if err != nil {
		return err
	}

	user.Password = hash

	_, err = DB.Model(user).Insert()

	if err != nil {
		return err
	}

	return c.JSON(http.StatusAccepted, user)
	// 	{
	//     "username": "sidm",
	//     "password": "sidm",
	//     "name": "sidm",
	//     "email": "sidm@sidm.com"
	// }
}

func Login(c echo.Context) error {
	type LoginCred struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	lc := &LoginCred{}
	if err := c.Bind(lc); err != nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{"status": "unauthorized", "err": err.Error()})
	}

	user := &models.User{}
	err := DB.Model(user).
		Where("username = ?", lc.Username).
		Select()

	if err != nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{"status": "unauthorized", "err": err.Error()})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(lc.Password))

	if err == bcrypt.ErrMismatchedHashAndPassword {
		return c.JSON(http.StatusUnauthorized, echo.Map{"status": "unauthorized", "err": err.Error()})
	} else if err != nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{"status": "unauthorized", "err": err.Error()})
	}

	// Set custom claims
	claims := &middlewares.JwtCustomClaims{
		lc.Username,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))

	if err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": t,
	})
}

func Logout(c echo.Context) error {
	return c.JSON(http.StatusAccepted, echo.Map{"logout": "successful"})
}
