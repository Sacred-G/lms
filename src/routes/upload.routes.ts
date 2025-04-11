import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  uploadAudio, 
  uploadVideo, 
  registerExternalAudioUrl, 
  registerExternalVideoUrl,
  getAudioFiles,
  getVideoFiles
} from '../controllers/upload.controller';
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

// Audio upload routes
router.post('/audio', upload.single('audio'), uploadAudio);
router.post('/external-audio', registerExternalAudioUrl);

// Video upload routes
router.post('/video', upload.single('video'), uploadVideo);
router.post('/external-video', registerExternalVideoUrl);

// File listing routes
router.get('/audio-files', getAudioFiles);
router.get('/video-files', getVideoFiles);

export default router;
