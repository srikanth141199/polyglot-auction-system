export interface Bid {
    id: string;
    amount: number;
    bidderId: string;
    timestamp: string;
}

export interface Auction {
    id: string;
    title: string;
    description?: string;
    startingPrice: number;
    endTime: string;
    bids: Bid[];
}