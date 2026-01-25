🏆 Polyglot Real-Time Auction Ecosystem

A high-performance, distributed microservices system designed to handle real-time bidding, inventory management, and instant user notifications.

This project demonstrates a Polyglot Microservices Architecture, where each service uses the technology best suited to its specific business problem, optimizing for performance, scalability, and maintainability.



🚀 Architecture Overview

The system is built around event-driven microservices with real-time communication and strong data consistency guarantees.

Key Goals

Ultra-low latency bidding

High concurrency support

Real-time user updates

Clear separation of responsibilities

Scalable and production-ready design



🧠 Technology Stack & Rationale

| Technology                  | Role                              | Why This Choice (Interview Talking Point)                                                                                                                        |
| --------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Go (Golang)**             | Bidding Engine                    | Go’s goroutines and lightweight concurrency model enable handling thousands of bids concurrently with minimal latency. Perfect for time-sensitive auction logic. |
| **Node.js + TypeScript**    | Inventory & Notification Services | Node’s non-blocking I/O excels at I/O-heavy tasks like catalog management and persistent WebSocket connections for live notifications.                           |
| **React**                   | Bidder Application                | Optimized for fast-paced UI updates. React hooks and the virtual DOM efficiently handle live auction tickers and bid updates.                                    |
| **Angular**                 | Admin Dashboard                   | Angular’s structured architecture, RxJS streams, and powerful form validation are ideal for complex, data-heavy admin workflows.                                 |
| **GraphQL (Federation)**    | API Gateway                       | A single federated GraphQL gateway unifies data from multiple services, allowing the frontend to fetch exactly what it needs in one request.                     |
| **RabbitMQ**                | Event Broker                      | Enables asynchronous, decoupled communication. Bidding remains fast while notifications are handled independently.                                               |
| **PostgreSQL**              | Bidding Database                  | Provides ACID compliance and strong transactional guarantees, ensuring financial integrity and preventing race conditions in bids.                               |
| **MongoDB**                 | Inventory Database                | Flexible schema supports diverse product attributes, descriptions, and image metadata without rigid constraints.                                                 |
| **Docker & Docker Compose** | Orchestration                     | Ensures all services and databases run consistently across environments with a single command.                                                                   |


🏗️ System Design

The system is divided into four core microservices, each with a clearly defined responsibility:

1️⃣ Bidding Service (Go)

Core auction engine

Processes incoming bids

Maintains auction timers

Ensures atomic bid placement using PostgreSQL transactions

Publishes bid events to RabbitMQ

2️⃣ Inventory Service (Node.js + TypeScript)

Manages auction listings and product catalogs

Handles categories, pricing metadata, and images

Stores flexible product data in MongoDB

Exposes GraphQL subgraph for the gateway

3️⃣ Notification Service (Node.js + TypeScript)

Listens to bid events from RabbitMQ

Pushes real-time notifications via WebSockets

Handles events like:

Outbid alerts

Auction won notifications

Auction end updates

4️⃣ API Gateway (GraphQL Federation)

Acts as the single entry point for all clients

Combines multiple subgraphs into a Supergraph

Allows frontends to query Go and Node services in one request

Reduces over-fetching and network round trips

🔄 Event-Driven Flow (High Level)

User places a bid from the React Bidder App

Request hits the GraphQL Gateway

Bid is processed by the Go Bidding Service

Bid event is published to RabbitMQ

Notification Service consumes the event

Real-time updates are pushed to connected users via WebSockets



📦 Project Structure

apps/
 ├── bidder-react/
 └── admin-angular/

services/
 ├── bidding-go/
 ├── inventory-node/
 ├── notif-node/
 └── gateway/

infra/
 ├── postgres/
 ├── mongodb/
 └── rabbitmq/

docker-compose.yml
README.md


This will start:

4 microservices

PostgreSQL

MongoDB

RabbitMQ

GraphQL Gateway

All services will be available locally with consistent networking.