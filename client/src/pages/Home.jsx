import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Home = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const allImages = [...images, images[0]];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/home-images`);
        const urls = res.data.map((img) => img.url);
        setImages(urls.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch images', err);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
      setIsTransitioning(true);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (current === images.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [current, images]);

  const handleRentNow = () => navigate('/cars');
  const handleViewDetails = () => navigate('/about');

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Image Slider */}
      <div
        ref={sliderRef}
        className={`absolute top-0 left-0 w-full h-full flex ${
          isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''
        }`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {allImages.map((img, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start px-4 sm:px-6 md:px-10 bg-black/30">
        <div className="text-white p-4 sm:p-6 rounded-lg max-w-full sm:max-w-xl">
          <p className="text-yellow-400 text-sm sm:text-base tracking-widest font-medium">* PREMIUM</p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Rental Car
          </h1>
          <p className="text-lg sm:text-xl mb-2">
            Luxury Drive <span className="text-yellow-400 font-semibold">$450</span> / DAY
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              onClick={handleViewDetails}
              className="bg-yellow-400 text-black px-6 py-2 sm:py-3 rounded-full hover:bg-yellow-500 transition font-semibold text-sm sm:text-base"
            >
              View Details
            </button>
            <button
              onClick={handleRentNow}
              className="border border-white text-white px-6 py-2 sm:py-3 rounded-full hover:bg-white hover:text-black transition font-semibold text-sm sm:text-base"
            >
              Rent Now →
            </button>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
              index === (current % images.length) ? 'bg-yellow-400' : 'bg-white/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Home;
