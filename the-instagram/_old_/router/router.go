package router

import (
	"backend/controllers"

	"github.com/labstack/echo/v4"
)

func Setup(e *echo.Echo) {
	// auth routes
	e.POST("/register", controllers.Register)
	e.POST("/login", controllers.Login)
	e.POST("/logout", controllers.Logout)

	// post routes
	e.GET("/posts/:id", controllers.GetAllPostsByFollowers)
	e.POST("/posts/:id/comment", controllers.PostComment)
	e.PATCH("/posts/:id/like", controllers.LikeOrUnlikePost)

	// user routes
	e.GET("user/:username", controllers.GetUserByUsername)
	e.GET("users/:id", controllers.GetUserByUserId)
	e.PATCH("users/:id/follow", controllers.ToggleFollow)

	// just for testing purposes
	e.GET("/hello", controllers.Hello)
	e.POST("/test", controllers.Test)
}
