import Booking from '../models/Booking.js';
import Car from '../models/car.js';
import { sendBookingStatusEmail } from '../utils/sendMail.js';

// ✅ Create Booking with Car Availability Check
export const createBooking = async (req, res) => {
  try {
    const { userId, carId, startDate, endDate, totalAmount } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // ✅ Check car availability
    const existingBooking = await Booking.findOne({
      carId,
      status: { $in: ['pending', 'approved'] },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Car is already booked for selected dates.' });
    }

    const booking = await Booking.create({
      userId,
      carId,
      startDate,
      endDate,
      totalAmount,
      status: 'pending'
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all bookings (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('carId', 'name brand image pricePerDay');

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get bookings for a specific user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('carId', 'name brand pricePerDay image');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Approve or Reject Booking with Email Notification
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate('userId', 'name email')
      .populate('carId', 'name brand image');

    // ✅ Email Content
    const subject = `Your Car Rental Booking has been ${status}`;
    const message = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello ${booking.userId.name},</h2>
        <p>Your booking for <strong>${booking.carId.name}</strong> has been <strong>${status.toUpperCase()}</strong> by our admin.</p>
        <p><strong>Start Date:</strong> ${new Date(booking.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> ${new Date(booking.endDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> ${status}</p>
        <br/>
        <p>Thank you for using our service!</p>
        <p><strong>Car Rental Team</strong></p>
      </div>
    `;

    // ✅ Send Email
    await sendBookingStatusEmail(booking.userId.email, subject, message);

    res.json({ message: `Booking ${status}`, booking });
  } catch (err) {
    console.error('Error updating booking status:', err);
    res.status(500).json({ error: err.message });
  }
};
