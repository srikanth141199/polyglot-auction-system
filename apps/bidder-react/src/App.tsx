import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import type { Auction, Bid } from './types';

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

function App() {
  // 1. Explicitly type the useQuery hook
  const { loading, error, data } = useQuery<{ activeAuctions: Auction[] }>(GET_AUCTIONS);

  if (loading) return <p>Loading auctions...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🏆 Live Auctions</h1>
      <div style={{ display: 'grid', gap: '20px' }}>
        {data?.activeAuctions.map((auction: Auction) => (
          <div key={auction.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h2>{auction.title}</h2>
            <p>Starting Price: ${auction.startingPrice}</p>
            <h3>Recent Bids:</h3>
            {auction.bids.length > 0 ? (
              <ul>
                {auction.bids.map((bid: Bid) => (
                  <li key={bid.id}>
                    ${bid.amount} - {new Date(bid.timestamp).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bids yet. Be the first!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;