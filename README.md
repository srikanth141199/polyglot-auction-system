# polyglot-auction-system

/local-auction-pro
  ├── docker-compose.yml         # Spins up everything locally
  ├── /gateway                   # Hive Gateway (composed supergraph)
  ├── /services
  │    ├── /bidding-go           # Go + Postgres + RabbitMQ Producer
  │    ├── /inventory-node       # Node + Mongo + GraphQL Subgraph
  │    └── /notif-node           # Node + RabbitMQ Consumer (WebSockets)
  ├── /apps
  │    ├── /bidder-react         # Client-side: Apollo Client
  │    └── /admin-angular        # Admin-side: Apollo Angular
  └── /infra                     # Local RabbitMQ & DB configs