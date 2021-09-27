package routes

import (
	"chat/controllers"

	"github.com/labstack/echo/v4"
)

func Setup(e *echo.Echo, h *controllers.Handler) {
	e.POST("/login", h.Login)
	e.POST("/signup", h.Signup)
	e.POST("/message", h.CreateMessage)
	e.POST("/room", h.CreateRoom)
	e.GET("/room/:name", h.FetchRoomMessages)
	e.GET("/rooms", h.GetRooms)
	e.GET("/user", h.GetUser)
}
