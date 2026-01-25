package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq" // Postgres driver
)

func main() {
	// Connection string - using the port from your docker-compose (5432)
	connStr := "host=localhost port=5432 user=user password=password dbname=bidding_db sslmode=disable"

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal("❌ Could not connect to Postgres:", err)
	}

	fmt.Println("✅ Go Bidding Service successfully connected to Postgres!")
}
