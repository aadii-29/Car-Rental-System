import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      const res = await axios.get('http://localhost:5000/api/bookings/all', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(res.data);
    } catch (err) {
      console.error('❌ Error fetching bookings:', err);
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBookings();
    } catch (error) {
      console.error(`❌ Failed to ${status} booking:`, error);
    }
  };

  if (loading) return <p className="text-center text-lg mt-10">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const visibleBookings = bookings.filter(
    (booking) => booking.status !== 'cancelled'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin - All Bookings</h1>

      {visibleBookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {visibleBookings.map((booking) => {
            const car = booking.carId || {};
            const user = booking.userId || {};
            const days =
              (new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24) || 1;
            const totalPrice = days * (car.pricePerDay || 0);

            return (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col sm:flex-row"
              >
                <img
                  src={`http://localhost:5000${car.image}`}
                  alt={car.name}
                  className="w-full sm:w-44 h-44 object-cover sm:rounded-l-xl"
                />

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{car.name}</h2>
                    <p className="text-sm text-gray-600">
                      <strong>User:</strong> {user.email}
                    </p>
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
                      <strong>Rate:</strong> ₹{car.pricePerDay}
                    </p>
                    <p className="text-sm text-gray-700 font-bold mt-1">
                      Total: ₹{totalPrice}
                    </p>
                    <p className="mt-2">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </p>
                  </div>

                  {booking.status === 'pending' && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(booking._id, 'approved')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
