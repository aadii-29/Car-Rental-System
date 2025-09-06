import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/user/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const sorted = res.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setBookings(sorted);
      } catch (err) {
        toast.error('Failed to fetch bookings');
      }
    };

    if (user && token) fetchBookings();
  }, [user?._id, token]);

  const handleCancel = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/cancel/${bookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Booking cancelled successfully');
      const res = await axios.get(
        `http://localhost:5000/api/bookings/user/${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const sorted = res.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      setBookings(sorted);
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full">Approved</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 text-xs rounded-full">Pending</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-700 px-3 py-1 text-xs rounded-full">Rejected</span>;
      case 'cancelled':
        return <span className="bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-full">Cancelled</span>;
      default:
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full">{status}</span>;
    }
  };

  if (!bookings.length) {
    return <div className="text-center mt-16 text-gray-600 text-lg">No bookings found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">My Booking History</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => {
          const days =
            (new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24) || 1;

          return (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-6"
            >
              <img
                src={`http://localhost:5000${booking.carId?.image}`}
                alt={booking.carId?.name}
                className="w-full md:w-40 h-28 object-cover rounded-md"
              />

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {booking.carId?.name || 'Unknown Car'}
                  </h3>
                  {getStatusBadge(booking.status)}
                </div>

                <p className="text-sm text-gray-600">
                  <strong>From:</strong> {new Date(booking.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>To:</strong> {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Days:</strong> {days}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Price/Day:</strong> ${booking.carId?.pricePerDay || 0}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Total:</strong>{' '}
                  <span className="font-bold text-green-600">${days * booking.carId?.pricePerDay}</span>
                </p>
              </div>

              {booking.status !== 'cancelled' && (
                <div className="flex justify-end items-end">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingHistory;
