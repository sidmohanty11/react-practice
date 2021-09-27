package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

//614c4750272ce92420b6b799

type User struct {
	ID        bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name      string        `json:"name" bson:"name"`
	Username  string        `json:"username" bson:"username"`
	Email     string        `json:"email" bson:"email"`
	Password  string        `json:"password,omitempty" bson:"password"`
	Token     string        `json:"token,omitempty" bson:"-"`
	Rooms     []*Room       `json:"rooms" bson:"rooms"`
	ImageUrl  string        `json:"image_url" bson:"image_url"`
	CreatedAt time.Time     `json:"created_at" bson:"created_at"`
	LastSeen  time.Time     `json:"last_seen" bson:"last_seen"`
}
