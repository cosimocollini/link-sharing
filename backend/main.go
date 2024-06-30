package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/cosimocollini/link-sharing-app/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/pressly/goose/v3"

	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

type apiConfig struct {
	DB        *database.Queries
	jwtSecret string
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	connString := getEnv("TURSO_DATABASE_URL") + "?authToken=" + getEnv("TURSO_AUTH_TOKEN")

	jwtSecret := getEnv("JWT_SECRET")

	db, err := sql.Open("libsql", connString)
	if err != nil {
		log.Fatal("failed to open db ")
	}
	defer db.Close()

	// db, err := sql.Open("sqlite3", connString)
	// if err != nil {
	// 	log.Fatal("Connection to db failed")
	// }

	if err := goose.SetDialect("sqlite"); err != nil {
		log.Fatal(err)
	}

	if err := goose.Up(db, "sql/schema"); err != nil {
		log.Fatal(err)
	}

	dbQueries := database.New(db)
	apiCfg := apiConfig{
		DB:        dbQueries,
		jwtSecret: jwtSecret,
	}

	fmt.Print("Hello!")

	r := gin.Default()

	r.Use(CORSMiddleware())

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.POST("/register", apiCfg.handlerUsersCreate)

	r.Run()
}
