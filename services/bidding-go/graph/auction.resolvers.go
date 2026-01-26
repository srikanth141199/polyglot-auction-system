package graph

import (
	"bidding-service/graph/model"
	"context"
	"time"
)

// PlaceBid is the resolver for the placeBid field.
func (r *mutationResolver) PlaceBid(ctx context.Context, auctionID string, amount float64) (*model.Bid, error) {
	// For now, let's create a record in Postgres
	// In a real scenario, we'd check if the bid is higher than the current one
	query := `INSERT INTO bids (auction_id, amount, bidder_id, created_at) VALUES ($1, $2, $3, $4) RETURNING id`

	var id string
	err := r.DB.QueryRowContext(ctx, query, auctionID, amount, "user-123", time.Now()).Scan(&id)
	if err != nil {
		return nil, err
	}

	return &model.Bid{
		ID:        id,
		Amount:    amount,
		BidderID:  "user-123",
		Timestamp: time.Now().Format(time.RFC3339),
	}, nil
}

// ActiveAuctions - Handled by Node.js Service (Gateway will merge these)
func (r *queryResolver) ActiveAuctions(ctx context.Context) ([]*model.Auction, error) {
	return []*model.Auction{}, nil
}

// Auction - Handled by Node.js Service
func (r *queryResolver) Auction(ctx context.Context, id string) (*model.Auction, error) {
	return nil, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
