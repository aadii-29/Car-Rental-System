import React, { useEffect, useState } from "react";
import {
  CarFront,
  Users,
  Settings,
  Briefcase,
  Trash2,
  Pencil,
  Search, // Import search icon from lucide-react
  XCircle, // Import clear (X) icon
} from "lucide-react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isAdmin = user?.role === "admin";

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars");
      setCars(res.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [location]);

  const handleDelete = async (carId) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/cars/${carId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars((prev) => prev.filter((car) => car._id !== carId));
      toast.success("Car deleted successfully ✅");
    } catch (error) {
      console.error("Failed to delete car:", error);
      toast.error("Failed to delete car ❌");
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading cars...</p>;
  }

  // Filter cars based on searchTerm (case-insensitive)
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search bar */}
      <div className="mb-6 max-w-md mx-auto relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search cars by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400
                     transition duration-300 placeholder:text-gray-400"
          spellCheck={false}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition"
            aria-label="Clear search"
          >
            <XCircle size={20} />
          </button>
        )}
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
              key={car._id}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={`http://localhost:5000${car.image}`}
                alt={car.name}
                className="w-full h-56 object-cover"
              />

              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => navigate(`/update-car/${car._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                    title="Update"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}

              <div className="p-5 flex flex-col justify-between flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {car.name}
                </h2>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <CarFront className="w-4 h-4 text-yellow-500" />
                    <span>Available</span>
                    <span className="ml-auto">{car.available ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-500" />
                    <span>Passengers</span>
                    <span className="ml-auto">{car.passengers}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-yellow-500" />
                    <span>Transmission</span>
                    <span className="ml-auto">{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-yellow-500" />
                    <span>Luggage</span>
                    <span className="ml-auto">{car.luggage} Bags</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xl font-bold text-yellow-600">
                    ${car.pricePerDay}
                    <span className="text-sm font-medium text-gray-500"> /day</span>
                  </p>
                  <button
                    onClick={() =>
                      !user ? navigate("/login") : navigate(`/book/${car._id}`)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full text-sm font-medium transition"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg text-gray-500">
            No cars found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default CarList;
