import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {

      return file;
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "video/mp4"];
    console.log(file.mimetype)    
    let myFileType =file.mimetype
    if (file.size > 10 * 1024 * 1024) {
      throw new BadRequestException('Le fichier est trop volumineux');
    }

    return file;
  }
}
