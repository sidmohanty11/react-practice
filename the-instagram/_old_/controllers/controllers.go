package controllers

import (
	"github.com/go-pg/pg/v10"
)

var DB *pg.DB

func ControllersSetup(db *pg.DB) {
	DB = db
}
