import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    passengers: {
      type: Number,
      required: true,
      min: 1,
    },
    luggage: {
      type: Number,
      required: true,
      min: 0,
    },
    transmission: {
      type: String,
      enum: ['Auto', 'Manual'],
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Car', carSchema);
