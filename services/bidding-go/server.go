package main

import (
	"bidding-service/graph" // Ensure this matches your go.mod
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/lib/pq" // IMPORTANT: The Postgres Driver
)

import (
    "github.com/golang-migrate/migrate/v4"
    "github.com/golang-migrate/migrate/v4/database/postgres"
    _ "github.com/golang-migrate/migrate/v4/source/file"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// 1. Database Connection Logic
	connStr := "host=localhost port=5432 user=user password=password dbname=bidding_db sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("❌ Failed to open database:", err)
	}
	defer db.Close()

	// Check if the database is actually reachable
	if err := db.Ping(); err != nil {
		log.Fatal("❌ Database unreachable:", err)
	}
	log.Println("✅ Connected to Postgres")

	// 2. Initialize the Resolver with the DB instance
	resolver := &graph.Resolver{
		DB: db,
	}

	runMigrations(db)

	// 3. Create the GraphQL Server
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	// 4. Set up Routes
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("🚀 Bidding Service ready at http://localhost:%s/", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func runMigrations(db *sql.DB) {
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		log.Fatal(err)
	}
	
	// This looks for the files in the 'migrations' folder you just created
	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		"postgres", driver)
	if err != nil {
		log.Fatal(err)
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatal(err)
	}
	log.Println("✅ Database migrations applied successfully!")
}
