# 🏆 Polyglot Real-Time Auction Ecosystem

A high-performance, distributed microservices system designed to handle real-time bidding, inventory management, and instant user notifications. This project demonstrates a **Polyglot Microservices Architecture**, where each service uses the technology best suited to its specific business problem, optimizing for performance, scalability, and maintainability.

---

## 🏗️ Architecture Overview

The system is built around **Apollo Federation 2.0**, orchestrating event-driven microservices that bridge the gap between NoSQL and Relational databases.



### 🎯 Key Goals
* **Ultra-low latency bidding:** Powered by Go's high-concurrency model.
* **High concurrency support:** Scalable subgraphs for inventory and notifications.
* **Real-time user updates:** Event-driven architecture via RabbitMQ and WebSockets.
* **Polyglot Persistence:** Matching the database engine (MongoDB/PostgreSQL) to the data's nature.

---

## 🧠 Technology Stack & Rationale

| Technology | Role | Why This Choice (Interview Talking Point) |
| :--- | :--- | :--- |
| **Go (Golang)** | Bidding Engine | Goroutines enable handling thousands of bids concurrently with minimal latency. Perfect for time-sensitive logic. |
| **Node.js + TS** | Inventory Service | Non-blocking I/O excels at catalog management and I/O-heavy metadata tasks. |
| **GraphQL (Federation)** | API Gateway | Unifies data from multiple services, allowing the frontend to fetch exactly what it needs in one request. |
| **PostgreSQL** | Bidding Database | Provides ACID compliance and strong transactional guarantees for financial integrity. |
| **MongoDB** | Inventory Database | Flexible schema supports diverse product attributes and image metadata without rigid constraints. |
| **RabbitMQ** | Event Broker | Enables asynchronous communication. Bidding remains fast while notifications are handled independently. |

---

## 🏗️ System Design

The system is divided into four core microservices, each with a clearly defined responsibility:

### 1️⃣ Bidding Service (Go @ Port 8080)
* Processes incoming bids and maintains auction timers.
* Ensures atomic bid placement using **PostgreSQL** transactions.
* **Federation:** Extends the `Auction` entity to provide real-time bid history.
* Publishes bid events to **RabbitMQ**.

### 2️⃣ Inventory Service (Node.js @ Port 5002)
* Manages auction listings and product catalogs.
* Stores flexible product data in **MongoDB**.
* **Federation:** Acts as the primary owner of the `Auction` entity.

### 3️⃣ API Gateway (Apollo @ Port 4000)
* The single entry point for all clients (React/Angular).
* Performs "Query Orchestration" to join MongoDB metadata and PostgreSQL transaction data.

### 4️⃣ Notification Service (Node.js)
* Listens to RabbitMQ events and pushes updates via WebSockets.
* Handles Outbid alerts and "Auction Won" notifications.



---

## 🔄 Federated Data Flow

1. **User places a bid** via the Frontend.
2. **Gateway (Port 4000)** routes the mutation to the **Go Bidding Service (Port 8080)**.
3. **Go Service** validates the bid and saves it to **PostgreSQL**.
4. **Go Service** emits an event to **RabbitMQ**.
5. When a user queries `activeAuctions`, the **Gateway** fetches titles from **MongoDB** and joins the latest bids from **PostgreSQL** in a single response.

---

## 📦 Project Structure

```text
├── apps/
│    ├── bidder-react/      # Bidder UI
│    └── admin-angular/     # Admin Dashboard
├── services/
│    ├── bidding-go/        # Go 1.23, gqlgen, PostgreSQL
│    ├── inventory-node/    # Node.js, Yoga, MongoDB
│    └── gateway/           # Apollo Gateway
└── infra/
     ├── postgres/          # Relational data
     └── mongodb/           # Document data