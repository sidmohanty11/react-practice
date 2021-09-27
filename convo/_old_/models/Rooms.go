package models

import "gopkg.in/mgo.v2/bson"

type Room struct {
	ID       bson.ObjectId `json:"id" bson:"_id,omitempty"`
	RoomName string        `json:"room_name" bson:"room_name"`
	Messages []*Message    `json:"messages" bson:"messages"`
}
