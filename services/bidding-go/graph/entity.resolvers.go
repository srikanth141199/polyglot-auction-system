package graph

import (
	"bidding-service/graph/model"
	"context"
)

// FindAuctionByID is the resolver for the findAuctionByID field.
func (r *entityResolver) FindAuctionByID(ctx context.Context, id string) (*model.Auction, error) {
	// The Gateway provides the ID from the Inventory service.
	// We return a stub object with just the ID.
	// gqlgen will then automatically call AuctionResolver.Bids to fetch the Postgres data.
	return &model.Auction{ID: id}, nil
}

// Entity returns EntityResolver implementation.
func (r *Resolver) Entity() EntityResolver { return &entityResolver{r} }

type entityResolver struct{ *Resolver }
