import Car from '../models/car.js';
import fs from 'fs';
import path from 'path';

// GET all cars (optionally filter by availability)
export const getAllCars = async (req, res) => {
  try {
    const { available } = req.query;
    const filter = available === 'true' ? { available: true } : {};
    const cars = await Car.find(filter);
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE car (Admin)
export const createCar = async (req, res) => {
  try {
    const {
      name,
      pricePerDay,
      available,
      passengers,
      transmission,
      luggage
    } = req.body;

    const carData = {
      name,
      pricePerDay: Number(pricePerDay),
      available: available === 'true' || available === true,
      passengers: Number(passengers),
      transmission,
      luggage: Number(luggage)
    };

    if (req.file) {
      carData.image = `/uploads/${req.file.filename}`;
    }

    const car = await Car.create(carData);
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE car (Admin)
export const updateCar = async (req, res) => {
  try {
    console.log('Incoming PUT body:', req.body);
    console.log('Incoming file:', req.file);

    const {
      name,
      pricePerDay,
      available,
      passengers,
      transmission,
      luggage
    } = req.body;

    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    if (name !== undefined) car.name = name;
    if (pricePerDay !== undefined) car.pricePerDay = Number(pricePerDay);
    if (available !== undefined) car.available = available === 'true' || available === true;
    if (passengers !== undefined) car.passengers = Number(passengers);
    if (transmission !== undefined) car.transmission = transmission;
    if (luggage !== undefined) car.luggage = Number(luggage);

    if (req.file) { 
      if (car.image) {
        const oldPath = path.join('uploads', path.basename(car.image));
        fs.unlink(oldPath, (err) => {
          if (err) console.log('Failed to delete old image:', err.message);
        });
      }
      car.image = `/uploads/${req.file.filename}`;
    }

    const updated = await car.save();
    res.json(updated);

  } catch (err) {
    console.error('Update Car Error:', err); // 👈 Full error log
    res.status(500).json({ error: err.message });
  }
};


// DELETE car (Admin)
export const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: 'Car not found' });

    // Delete image from disk
    if (deletedCar.image) {
      const imagePath = path.join('uploads', path.basename(deletedCar.image));
      fs.unlink(imagePath, (err) => {
        if (err) console.log('Failed to delete image:', err.message);
      });
    }

    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
