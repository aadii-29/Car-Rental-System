import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [carData, setCarData] = useState({
    name: "",
    pricePerDay: "",
    passengers: "",
    transmission: "",
    luggage: "",
    available: true,
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cars/${id}`);
        const car = res.data;

        setCarData({
          name: car.name || "",
          pricePerDay: car.pricePerDay || "",
          passengers: car.passengers || "",
          transmission: car.transmission || "",
          luggage: car.luggage || "",
          available: car.available ?? true,
          image: car.image || null,
        });

        if (car.image) {
          setPreview(`http://localhost:5000${car.image}`);
        }
      } catch (err) {
        console.error("Error fetching car:", err);
        toast.error("Failed to load car details");
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setCarData({ ...carData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else if (type === "checkbox") {
      setCarData({ ...carData, [name]: checked });
    } else {
      setCarData({ ...carData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", carData.name);
      formData.append("pricePerDay", carData.pricePerDay);
      formData.append("passengers", carData.passengers);
      formData.append("transmission", carData.transmission);
      formData.append("luggage", carData.luggage);
      formData.append("available", carData.available);

      if (carData.image instanceof File) {
        formData.append("image", carData.image);
      }

      await axios.put(`http://localhost:5000/api/cars/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Car updated successfully!");
      setTimeout(() => navigate("/cars"), 1500);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update car");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Update Car Details
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Car Name</label>
          <input
            type="text"
            name="name"
            value={carData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Car Name"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Price Per Day</label>
            <input
              type="number"
              name="pricePerDay"
              value={carData.pricePerDay}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="₹/Day"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">No. of Passengers</label>
            <input
              type="number"
              name="passengers"
              value={carData.passengers}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 4"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Transmission</label>
            <select
              name="transmission"
              value={carData.transmission}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Manual">Manual</option>
              <option value="Auto">Auto</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Luggage Capacity</label>
            <input
              type="number"
              name="luggage"
              value={carData.luggage}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 2"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="available"
              checked={carData.available}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Available for rent</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Car Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
          />
        </div>

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg w-full max-h-64 object-cover border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-xl font-semibold transition"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
