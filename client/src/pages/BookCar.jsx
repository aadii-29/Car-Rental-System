import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role === 'admin') {
      toast.error('Only users can book cars.');
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        console.error('Failed to fetch car:', err);
      }
    };

    fetchCar();
  }, [id]);

  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleBooking = async () => {
    const days = calculateDays();
    if (!startDate || !endDate || days < 1) {
      toast.error('Please select a valid start and end date');
      return;
    }

    const bookingData = {
      carId: id,
      userId: user._id,
      startDate,
      endDate,
      days,
      totalPrice: car.pricePerDay * days,
    };

    try {
      await axios.post('http://localhost:5000/api/bookings', bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Booking successful!');
      navigate('/');
    } catch (err) {
      console.error('Booking error:', err);
      toast.error('Booking failed. Please try again.');
    }
  };

  if (!car) {
    return <div className="text-center mt-10 text-lg">Loading car details...</div>;
  }

  const days = calculateDays();

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Book {car.name}</h2>

      <div className="mb-6">
        <img
          src={`http://localhost:5000${car.image}`}
          alt={car.name}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="startDate" className="block font-semibold text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block font-semibold text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        {days > 0 && (
          <div className="font-semibold text-lg text-gray-800">
            Duration: {days} day(s) <br />
            Total Price: ${car.pricePerDay * days}
          </div>
        )}

        <button
          onClick={handleBooking}
          className="bg-yellow-500 text-white w-full py-2 rounded-full font-semibold hover:bg-yellow-600 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookCar;
