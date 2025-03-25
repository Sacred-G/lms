import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { FileFilterCallback } from 'multer';

// Extend the Express Request type to include the file property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Interface for external URL requests
interface ExternalUrlRequest {
  url: string;
  fileName: string;
}

// Handle file upload for audio files
export const uploadAudio = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    console.log('File uploaded to temporary location:', req.file.path);
    console.log('File details:', req.file);

    // Check if file is an audio file
    const allowedMimeTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/ogg'];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      res.status(400).json({ message: 'File must be an audio file (WAV, MP3, or OGG)' });
      return;
    }

    // Move file to public/audio directory
    const targetDir = path.join(__dirname, '../../client/public/audio');
    console.log('Target directory:', targetDir);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      console.log('Creating target directory');
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Generate a safe filename
    const originalName = req.file.originalname;
    const fileName = originalName.replace(/\s+/g, '_');
    const targetPath = path.join(targetDir, fileName);
    console.log('Target path:', targetPath);
    
    try {
      // Move the file
      fs.renameSync(req.file.path, targetPath);
      console.log('File moved successfully');
    } catch (moveError) {
      console.error('Error moving file:', moveError);
      // If rename fails, try copy and delete
      try {
        fs.copyFileSync(req.file.path, targetPath);
        fs.unlinkSync(req.file.path);
        console.log('File copied and original deleted successfully');
      } catch (copyError: any) {
        console.error('Error copying file:', copyError);
        res.status(500).json({ message: 'Failed to move uploaded file', error: copyError.message });
        return;
      }
    }
    
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

// Handle external audio URL registration
export const registerExternalAudioUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url, fileName } = req.body as ExternalUrlRequest;
    
    if (!url || !fileName) {
      res.status(400).json({ message: 'URL and fileName are required' });
      return;
    }
    
    console.log('Registering external audio URL:', url);
    console.log('With file name:', fileName);
    
    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      res.status(400).json({ message: 'Invalid URL format' });
      return;
    }
    
    // Generate a safe filename
    const safeFileName = fileName.replace(/\s+/g, '_');
    
    // Return the external URL
    res.status(200).json({ 
      url: url,
      fileName: safeFileName,
      originalName: fileName,
      isExternal: true
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Handle external video URL registration
export const registerExternalVideoUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url, fileName } = req.body as ExternalUrlRequest;
    
    if (!url || !fileName) {
      res.status(400).json({ message: 'URL and fileName are required' });
      return;
    }
    
    console.log('Registering external video URL:', url);
    console.log('With file name:', fileName);
    
    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      res.status(400).json({ message: 'Invalid URL format' });
      return;
    }
    
    // Generate a safe filename
    const safeFileName = fileName.replace(/\s+/g, '_');
    
    // Return the external URL
    res.status(200).json({ 
      url: url,
      fileName: safeFileName,
      originalName: fileName,
      isExternal: true
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

    console.log('File uploaded to temporary location:', req.file.path);
    console.log('File details:', req.file);

    // Check if file is a video file
    const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      res.status(400).json({ message: 'File must be a video file (MP4, WebM, or OGG)' });
      return;
    }

    // Move file to public/videos directory
    const targetDir = path.join(__dirname, '../../client/public/videos');
    console.log('Target directory:', targetDir);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      console.log('Creating target directory');
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Generate a safe filename
    const originalName = req.file.originalname;
    const fileName = originalName.replace(/\s+/g, '_');
    const targetPath = path.join(targetDir, fileName);
    console.log('Target path:', targetPath);
    
    try {
      // Move the file
      fs.renameSync(req.file.path, targetPath);
      console.log('File moved successfully');
    } catch (moveError) {
      console.error('Error moving file:', moveError);
      // If rename fails, try copy and delete
      try {
        fs.copyFileSync(req.file.path, targetPath);
        fs.unlinkSync(req.file.path);
        console.log('File copied and original deleted successfully');
      } catch (copyError: any) {
        console.error('Error copying file:', copyError);
        res.status(500).json({ message: 'Failed to move uploaded file', error: copyError.message });
        return;
      }
    }
    
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
