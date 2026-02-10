import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import type { Auction, Bid } from './types';
import { useState } from 'react';

const GET_AUCTIONS = gql`
  query GetAuctions {
    activeAuctions {
      id
      title
      startingPrice
      bids {
        id
        amount
        timestamp
      }
    }
  }
`;

const PLACE_BID = gql`
  mutation PlaceBid($auctionId: ID!, $amount: Float!) {
    placeBid(auctionId: $auctionId, amount: $amount) {
      id
      amount
      timestamp
    }
  }
`;

function App() {
  const [bidAmounts, setBidAmounts] = useState<{ [key: string]: string }>({});
  const { loading, error, data, refetch } = useQuery<{ activeAuctions: Auction[] }>(GET_AUCTIONS);

  const [placeBid] = useMutation(PLACE_BID, {
    onCompleted: () => {
      refetch(); // Refresh the list after a successful bid
      alert("Bid placed successfully!");
    },
    onError: (err) => alert(`Error: ${err.message}`)
  });

  const handleBidSubmit = (auctionId: string) => {
    const amount = parseFloat(bidAmounts[auctionId]);
    if (isNaN(amount)) return alert("Please enter a valid number");

    placeBid({ variables: { auctionId, amount } });
  };

  if (loading) return <p>Loading auctions...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1>🏆 Polyglot Auction Dashboard</h1>
      <div style={{ display: 'grid', gap: '20px' }}>
        {data?.activeAuctions.map((auction: Auction) => (
          <div key={auction.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>{auction.title}</h2>
            <p>Starting Price: <strong>${auction.startingPrice}</strong></p>
            
            <div style={{ marginBottom: '15px' }}>
              <input 
                type="number" 
                placeholder="Enter bid amount"
                value={bidAmounts[auction.id] || ''}
                onChange={(e) => setBidAmounts({ ...bidAmounts, [auction.id]: e.target.value })}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px' }}
              />
              <button 
                onClick={() => handleBidSubmit(auction.id)}
                style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Place Bid
              </button>
            </div>

            <h3>Recent Bids (PostgreSQL):</h3>
            {auction.bids.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[...auction.bids].reverse().map((bid: Bid) => (
                  <li key={bid.id} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                    <strong>${bid.amount}</strong> <small style={{ color: '#666' }}> - {new Date(bid.timestamp).toLocaleTimeString()}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontStyle: 'italic', color: '#888' }}>No bids yet. Be the first!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;