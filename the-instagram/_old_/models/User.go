package models

import (
	"time"
)

type User struct {
	ID        uint      `pg:",pk" json:"id"`
	Username  string    `pg:",notnull,unique" json:"username"`
	Name      string    `pg:",notnull" json:"name"`
	Email     string    `pg:",notnull,unique" json:"email"`
	Password  string    `pg:",notnull" json:"-"`
	Followers []string  `json:"followers"`
	Following []string  `json:"following"`
	Posts     []*Post   `pg:"rel:has-many" json:"posts"`
	CreatedAt time.Time `pg:"default:now()" json:"created_at"`
	UpdatedAt time.Time `pg:"default:now()" json:"updated_at"`
}
