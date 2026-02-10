---

## 🚀 Quick Start (Local Development)

To run the full ecosystem on your local machine, follow these steps in order.

### 1. Prerequisites & Infrastructure
Ensure your local databases are running on the following ports:
* **MongoDB:** `mongodb://localhost:27018/inventory`
* **PostgreSQL:** `postgres://localhost:5432/bidding`
* **RabbitMQ:** `localhost:5672` (Management UI at `15672`)

### 2. Start Subgraphs
Open three separate terminals and run the following:

#### **A. Inventory Service (Node.js)**
```powershell
cd services/inventory-node
npm install
npm start
# Running at http://localhost:5002/graphql


#### **B. Bidding Service (Go)**

cd services/bidding-go
# Force local toolchain for Go 1.23 compatibility
$env:GOTOOLCHAIN="local"
go mod tidy
go run server.go
# Running at http://localhost:8080/query


#### **C. API Gateway (Apollo)**

cd services/gateway
npm install
npm start
# Unified entry point at http://localhost:4000/graphql

3. Verify the Federation
Run the following query at http://localhost:4000/graphql to see the cross-database join in action:

GraphQL
query {
  activeAuctions {
    id
    title
    startingPrice
    bids {
      amount
      timestamp
    }
  }
}