import { Auction } from './models/Auction'; // Ensure the path to your Mongoose model is correct

export const resolvers = {
  Query: {
    activeAuctions: async () => {
      // This fetches ALL auctions from MongoDB. 
      // In a real app, you'd filter by { endTime: { $gt: new Date() } }
      return await Auction.find({});
    },
    auction: async (_: any, { id }: { id: string }) => {
      return await Auction.findById(id);
    }
  },
  Mutation: {
    createAuction: async (_: any, { title, startingPrice, endTime }: any) => {
      const newAuction = new Auction({
        title,
        startingPrice,
        endTime,
      });
      return await newAuction.save();
    }
  }
};