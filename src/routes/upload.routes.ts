import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadAudio, uploadVideo } from '../controllers/upload.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store files temporarily in the uploads directory
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// All upload routes require authentication and admin role
router.use(protect);
router.use(restrictTo('admin'));

// Audio upload route
router.post('/audio', upload.single('audio'), uploadAudio);

// Video upload route
router.post('/video', upload.single('video'), uploadVideo);

export default router;
