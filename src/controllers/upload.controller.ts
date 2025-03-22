import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { FileFilterCallback } from 'multer';

// Extend the Express Request type to include the file property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Handle file upload for audio files
export const uploadAudio = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    // Check if file is an audio file
    const allowedMimeTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/ogg'];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      res.status(400).json({ message: 'File must be an audio file (WAV, MP3, or OGG)' });
      return;
    }

    // Move file to public/audio directory
    const targetDir = path.join(__dirname, '../../client/public/audio');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Generate a safe filename
    const originalName = req.file.originalname;
    const fileName = originalName.replace(/\s+/g, '_');
    const targetPath = path.join(targetDir, fileName);
    
    // Move the file
    fs.renameSync(req.file.path, targetPath);
    
    // Return the file URL
    const fileUrl = `/audio/${fileName}`;
    
    res.status(200).json({ 
      url: fileUrl,
      fileName: fileName,
      originalName: originalName
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Handle file upload for video files
export const uploadVideo = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    // Check if file is a video file
    const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      res.status(400).json({ message: 'File must be a video file (MP4, WebM, or OGG)' });
      return;
    }

    // Move file to public/videos directory
    const targetDir = path.join(__dirname, '../../client/public/videos');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Generate a safe filename
    const originalName = req.file.originalname;
    const fileName = originalName.replace(/\s+/g, '_');
    const targetPath = path.join(targetDir, fileName);
    
    // Move the file
    fs.renameSync(req.file.path, targetPath);
    
    // Return the file URL
    const fileUrl = `/videos/${fileName}`;
    
    res.status(200).json({ 
      url: fileUrl,
      fileName: fileName,
      originalName: originalName
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
