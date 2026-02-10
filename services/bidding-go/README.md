### 📂 Bidding Service (`/services/bidding-go`)

# Bidding Transaction Service (Go)

High-performance service responsible for managing all bidding transactions. It "extends" the Auction entity provided by the Inventory service.

## 🚀 Tech Stack
- **Language:** Go 1.23
- **Framework:** gqlgen
- **Database:** PostgreSQL (Relational)
- **Federation:** Apollo Federation 2.0 Subgraph

## 📍 Endpoint
- **URL:** `http://localhost:8080/query`

## 🔑 Key Features
- **Type Extension:** Extends the `Auction` type to add the `bids` field.
- **SQL Transactions:** Uses raw SQL with `database/sql` for precise control over financial records.
- **Entity Resolution:** Implements `FindAuctionByID` to link Postgres records to MongoDB IDs.

## 🛠️ Setup
1. `$env:GOTOOLCHAIN="local"`
2. `go mod tidy`
3. `go run server.go`

## 📖 Sample Query
```graphql
mutation {
  placeBid(auctionId: "MONGODB_ID_HERE", amount: 1050) {
    id
    amount
    timestamp
  }
}
