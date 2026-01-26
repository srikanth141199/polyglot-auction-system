import mongoose, {Document, Schema} from 'mongoose';

// Define the shape of our Data
export interface IAuction extends Document {
  title: string;
  description?: string;
  startingPrice: number;
  endTime: Date;
}

const AuctionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startingPrice: { type: Number, required: true },
  endTime: { type: Date, required: true },
});

export const Auction = mongoose.model<IAuction>('Auction', AuctionSchema);