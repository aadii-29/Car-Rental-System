import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddCar = () => {
  const [carData, setCarData] = useState({
    name: "",
    brand: "",
    pricePerDay: "",
    transmission: "",
    luggage: "",
    passengers: "",
    available: true,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setCarData({ ...carData, image: files[0] });
    } else if (type === "checkbox") {
      setCarData({ ...carData, available: checked });
    } else if (
      name === "pricePerDay" ||
      name === "luggage" ||
      name === "passengers"
    ) {
      setCarData({ ...carData, [name]: Number(value) });
    } else {
      setCarData({ ...carData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries({
        name: carData.name,
        brand: carData.brand,
        pricePerDay: carData.pricePerDay,
        transmission: carData.transmission,
        luggage: carData.luggage,
        passengers: carData.passengers,
        available: carData.available,
      }).forEach(([key, val]) => formData.append(key, val));

      if (carData.image) {
        formData.append("image", carData.image);
      }

      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/cars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Car added successfully!");
      setCarData({
        name: "",
        brand: "",
        pricePerDay: "",
        transmission: "",
        luggage: "",
        passengers: "",
        available: true,
        image: null,
      });
    } catch (err) {
      console.error("Add car error:", err);
      toast.error("Failed to add car");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        🚘 Add New Car
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Car Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Car Name
          </label>
          <input
            type="text"
            name="name"
            value={carData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-400"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={carData.brand}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-400"
          />
        </div>

        {/* Price Per Day */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Price ($/day)
          </label>
          <input
            type="number"
            name="pricePerDay"
            value={carData.pricePerDay}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-400"
          />
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Transmission
          </label>
          <select
            name="transmission"
            value={carData.transmission}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-400"
          >
            <option value="">Select</option>
            <option value="Manual">Manual</option>
            <option value="Auto">Auto</option>
          </select>
        </div>

        {/* Luggage */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Luggage
          </label>
          <input
            type="number"
            name="luggage"
            value={carData.luggage}
            onChange={handleChange}
            required
            placeholder="e.g. 2"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-400"
          />
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Passengers
          </label>
          <input
            type="number"
            name="passengers"
            value={carData.passengers}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-400"
          />
        </div>

        {/* Availability */}

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Select
          </label>
          <select
            name="available"
            value={carData.available ? "true" : "false"}
            onChange={(e) =>
              setCarData({ ...carData, available: e.target.value === "true" })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-400"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Upload Car Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-6 py-2 rounded-full shadow hover:bg-yellow-600 transition duration-300"
          >
            ➕ Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
