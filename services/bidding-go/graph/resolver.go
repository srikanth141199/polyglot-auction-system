package graph

import "database/sql"

// This dependency injection allows your resolvers to access the DB.
type Resolver struct {
	DB *sql.DB
}
