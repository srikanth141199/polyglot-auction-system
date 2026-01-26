# Auction Inventory Service (Node.js)

This service acts as the **Source of Truth** for auction metadata. It manages the product catalog and handles the lifecycle of auction listings.

## 🚀 Tech Stack
- **Runtime:** Node.js (TypeScript)
- **Framework:** Express + GraphQL Yoga
- **Database:** MongoDB (NoSQL)
- **Federation:** Apollo Federation 2.0 Subgraph

## 📍 Endpoint
- **URL:** `http://localhost:5002/graphql`

## 🔑 Key Features
- **Entity Ownership:** Owns the `Auction` type and the `@key(fields: "id")`.
- **Reference Resolver:** Implements `__resolveReference` to allow other services to join data based on the MongoDB `_id`.

## 🛠️ Setup
1. `npm install`
2. Ensure MongoDB is running on `mongodb://localhost:27018/inventory`
3. `npm run dev`

## 📖 Sample Query
```graphql
mutation {
  createAuction(title: "Vintage Camera", startingPrice: 100, endTime: "1798675200000") {
    id
    title
  }
}