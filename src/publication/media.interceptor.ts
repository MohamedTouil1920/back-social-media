import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const mediaInterceptor = FileInterceptor('media', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const filename = `${Date.now()}-${file.originalname}`;
      callback(null, filename);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite à 10 Mo
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true); // Accepté
    } else {
      callback(new Error('Type de fichier non autorisé'), false); // Rejeté
    }
  },
});
