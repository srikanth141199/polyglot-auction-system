### 📂 Apollo Gateway (`/gateway`)

# Polyglot Auction Gateway

The central entry point for the entire system. It composes the two subgraphs (Inventory and Bidding) into a single, unified GraphQL schema.

## 🚀 Tech Stack
- **Runtime:** Node.js
- **Framework:** Apollo Gateway
- **Architecture:** Federated Supergraph

## 📍 Endpoint
- **URL:** `http://localhost:4000/graphql`

## 🔑 Key Features
- **Schema Composition:** Merges NoSQL (Mongo) and Relational (Postgres) data seamlessly.
- **Query Routing:** Automatically routes metadata requests to Node.js and transaction requests to Go.
- **Query Orchestration:** Performs the "Join" across services to fulfill complex requests in one round-trip.

## 🛠️ Setup
1. `npm install`
2. Ensure both subgraphs (Port 5002 and 8080) are running.
3. `npm start`

## 📖 The "Join" Query
```graphql
query {
  activeAuctions {
    title       # From MongoDB (Inventory)
    bids {      # From PostgreSQL (Bidding)
      amount
    }
  }
}
