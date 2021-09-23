package db

import (
	"backend/models"
	"context"
	"log"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
)

func ConnectDB() *pg.DB {
	db := pg.Connect(&pg.Options{
		Addr:     ":5432",
		User:     "postgres",
		Password: "postgres",
		Database: "instagram",
	})

	ctx := context.Background()

	if err := db.Ping(ctx); err != nil {
		panic(err)
	}

	err := createSchema(db)

	if err != nil {
		return db
	}

	return db
}

func createSchema(db *pg.DB) error {
	models := []interface{}{
		(*models.User)(nil),
		(*models.Post)(nil),
	}

	for _, model := range models {
		err := db.Model(model).CreateTable(&orm.CreateTableOptions{
			Temp: false,
		})
		log.Println(model)
		if err != nil {
			return err
		}
	}

	log.Println(models)

	return nil
}
