import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminHomeImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [homeImages, setHomeImages] = useState([]);
  const [editFilename, setEditFilename] = useState(null);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/home-images');
      setHomeImages(res.data);
    } catch (err) {
      toast.error('Failed to fetch images');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return toast.error('Please select an image');

    const formData = new FormData();
    formData.append('image', image);

    try {
      if (editFilename) {
        await axios.put(`http://localhost:5000/api/home-images/${editFilename}`, formData);
        toast.success('Image updated');
        setEditFilename(null);
      } else {
        await axios.post('http://localhost:5000/api/home-images/upload', formData);
        toast.success('Image uploaded');
      }

      setImage(null);
      setPreview(null);
      fetchImages();
    } catch (err) {
      toast.error('Upload/update failed');
      console.error(err);
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`http://localhost:5000/api/home-images/${filename}`);
      toast.success('Image deleted');
      fetchImages();
    } catch (err) {
      toast.error('Delete failed');
      console.error(err);
    }
  };

  const handleEdit = (img) => {
    setEditFilename(img.filename);
    setPreview(img.url);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        {editFilename ? 'Update Home Page Image' : 'Upload Home Page Image'}
      </h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:text-sm file:bg-gray-100 file:text-gray-700"
        />

        {preview && <img src={preview} alt="Preview" className="w-64 h-auto rounded border" />}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            {editFilename ? 'Update Image' : 'Upload'}
          </button>
          {editFilename && (
            <button
              type="button"
              onClick={() => {
                setEditFilename(null);
                setPreview(null);
                setImage(null);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">Uploaded Images</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {homeImages.map((img) => (
          <div key={img.filename} className="border p-2 rounded shadow">
            <img
              src={img.url}
              alt="Home"
              className="w-full h-40 object-cover rounded"
            />
            <div className="mt-2 flex justify-between">
              <button
                onClick={() => handleEdit(img)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(img.filename)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHomeImageUpload;
