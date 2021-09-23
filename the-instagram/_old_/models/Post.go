package models

import (
	"time"
)

type Post struct {
	ID          uint       `pg:",pk" json:"id"`
	User        *User      `pg:"rel:has-one" json:"user"`
	Description string     `json:"description"`
	PostImage   string     `json:"post_image"`
	Comments    []*Comment `pg:"rel:has-many,join_fk:id" json:"comments"`
	Likes       []string   `json:"likes"`
	CreatedAt   time.Time  `pg:"default:now()" json:"created_at"`
	UpdatedAt   time.Time  `pg:"default:now()" json:"updated_at"`
}

type Posts struct {
	Post []*Post `json:"posts"`
}

type Comment struct {
	ID   uint   `pg:",pk" json:"id"`
	User *User  `pg:"rel:has-one" json:"user"`
	Text string `json:"text"`
}
