package rabbitmq

import (
	"context"
	"encoding/json"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

type BidEvent struct {
	AuctionID string  `json:"auctionId"`
	Amount    float64 `json:"amount"`
	BidderID  string  `json:"bidderId"`
	Timestamp string  `json:"timestamp"`
}

func PublishBidEvent(event BidEvent) {
	// Connect to RabbitMQ (Using the guest/guest credentials you set in Docker)
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		log.Printf("Failed to connect to RabbitMQ: %v", err)
		return
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Printf("Failed to open a channel: %v", err)
		return
	}
	defer ch.Close()

	// Declare the queue
	q, err := ch.QueueDeclare(
		"bid_events", // name
		true,         // durable
		false,        // delete when unused
		false,        // exclusive
		false,        // no-wait
		nil,          // arguments
	)
	if err != nil {
		log.Printf("Failed to declare a queue: %v", err)
		return
	}

	body, _ := json.Marshal(event)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = ch.PublishWithContext(ctx,
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "application/json",
			Body:        body,
		})

	if err != nil {
		log.Printf("Failed to publish a message: %v", err)
	} else {
		log.Printf(" [x] Sent Bid Event: %s", body)
	}
}
