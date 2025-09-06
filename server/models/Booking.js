import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  startDate: Date,
  endDate: Date,
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'approved','rejected', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
