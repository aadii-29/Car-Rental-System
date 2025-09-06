import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Upload folder
const uploadPath = 'uploads/home';
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });


router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.status(200).json({ filename: req.file.filename });
});


router.get('/', (req, res) => {
  fs.readdir(uploadPath, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });

    const imageData = files.map((file) => ({
      filename: file,
      url: `http://localhost:5000/uploads/home/${file}`,
    }));

    res.json(imageData);
  });
});


router.put('/:filename', upload.single('image'), (req, res) => {
  const oldFilename = req.params.filename;
  const oldFilePath = path.join(uploadPath, oldFilename);

  // Delete the old file if it exists
  if (fs.existsSync(oldFilePath)) {
    fs.unlinkSync(oldFilePath);
  }

  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  res.json({
    message: 'Image replaced successfully',
    filename: req.file.filename,
  });
});


router.delete('/:filename', (req, res) => {
  const filePath = path.join(uploadPath, req.params.filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ message: 'Image deleted successfully' });
  } else {
    res.status(404).json({ message: 'Image not found' });
  }
});

export default router;
