import { Controller, Post, Body, Param, Delete, Put, Get, UseGuards, UseInterceptors, UsePipes, UploadedFile, Req } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { User } from 'src/user/entities/user.entity';
import { Publication } from 'src/publication/entities/publication.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileValidationPipe } from 'src/publication/File-Valdaion-Pipe';
import { AuthGuard } from './../auth/auth.guard';

@Controller('commentaires')
export class CommentaireController {
  constructor(private readonly commentaireService: CommentaireService) {}

  // Créer un commentaire pour une publication donnée
  @Post('publication/:publicationId')
 
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('media', {
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
    }),
  )
 
  @UsePipes(FileValidationPipe)  // Ajout du pipe de validation
  async create(
    @Body() createcommentaireDto: CreateCommentaireDto,
    @UploadedFile() media?: Express.Multer.File,
    @Req() req?,
  ) {
    const mediaUrl = media ? `/uploads/${media.filename}` : null;
    const mediaType = media ? media.mimetype.startsWith('image') ? 'image' : 'video' : null;

    return this.commentaireService.create(createcommentaireDto, req.user.id, mediaUrl, mediaType);
  }
  // Récupérer tous les commentaires pour une publication
  @Get('publication/:publicationId')
  async findByPublication(@Param('publicationId') publicationId: number) {
    return await this.commentaireService.findByPublication(publicationId);
  }

  // Récupérer tous les commentaires d'un utilisateur
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: number) {
    return await this.commentaireService.findByUser(userId);
  }

  // Mettre à jour un commentaire
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentaireDto: UpdateCommentaireDto,
  ) {
    return await this.commentaireService.update(id, updateCommentaireDto);
  }

  // Supprimer un commentaire
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.commentaireService.remove(id);
  }
}
