import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Le fichier est requis');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Type de fichier non autorisé');
    }

    if (file.size > 10 * 1024 * 1024) { // 10 Mo
      throw new BadRequestException('Le fichier est trop volumineux');
    }

    return file;
  }
}
