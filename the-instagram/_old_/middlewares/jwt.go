package middlewares

import (
	"net/http"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type JwtCustomClaims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func Authorize(e *echo.Echo) {
	config := middleware.JWTConfig{
		Claims:     &JwtCustomClaims{},
		SigningKey: []byte("secret"),
	}
	r := e.Group("/posts")
	r.Use(middleware.JWTWithConfig(config))
	r.GET("", restricted)
}

func restricted(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(*JwtCustomClaims)
	name := claims.Username
	return c.String(http.StatusOK, "Welcome "+name+"!")
}
