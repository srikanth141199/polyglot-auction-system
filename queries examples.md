1. Inventory Service (Node.js/MongoDB)
Port: 4001 This service acts as the "source of truth" for auction item details. Use these queries to verify your MongoDB data.

Get All Items:

GraphQL
query {
  activeAuctions {
    id
    title
    startingPrice
    endTime
  }
}
Create a New Item:

GraphQL
mutation {
  createAuction(
    title: "Vintage Camera",
    startingPrice: 50.0,
    endTime: "2026-12-31"
  ) {
    id
    title
  }
}




2. Bidding Service (Go/PostgreSQL)
Port: 8080 This service manages the bid transactions. You can query it directly using an ID obtained from the Inventory service.

Get Bids for a Specific ID:

GraphQL
query {
  auction(id: "PASTE_ID_HERE") {
    id
    bids {
      amount
      bidderId
      timestamp
    }
  }
}
Place a New Bid:

GraphQL
mutation {
  placeBid(auctionId: "PASTE_ID_HERE", amount: 150.50) {
    id
    amount
    timestamp
  }
}



3. Gateway (Apollo Gateway)
Port: 4000 This is where the "magic" happens. The Gateway uses Federation to fetch titles from Node.js and bids from Go simultaneously.

The Federated Query (The "Join"):

GraphQL
query {
  activeAuctions {
    id
    title          # Comes from Node.js/MongoDB
    startingPrice  # Comes from Node.js/MongoDB
    bids {         # Comes from Go/PostgreSQL
      amount
      bidderId
    }
  }
}