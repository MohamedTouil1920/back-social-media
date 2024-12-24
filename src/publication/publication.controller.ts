import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, Req, UsePipes, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { FileValidationPipe } from './File-Valdaion-Pipe';
import { mediaInterceptor } from './media.interceptor';

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(mediaInterceptor)
  @UsePipes(FileValidationPipe)
  async create(
    @Body() createPublicationDto: CreatePublicationDto,
    @UploadedFile() media: Express.Multer.File,
    @Req() req,
  ) {
    const mediaUrl = media ? `/uploads/${media.filename}` : null;
    const mediaType = media ? media.mimetype.startsWith('image') ? 'image' : 'video' : null;
    return this.publicationService.create(createPublicationDto, req.user, mediaUrl, mediaType);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UseInterceptors(mediaInterceptor)
  @UsePipes(FileValidationPipe)
  async update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
    @UploadedFile() media: Express.Multer.File,
    @Req() req,
  ) {
    const mediaUrl = media ? `/uploads/${media.filename}` : null;
    const mediaType = media ? media.mimetype.startsWith('image') ? 'image' : 'video' : null;
    return this.publicationService.update(Number(id), updatePublicationDto, req.user, mediaUrl, mediaType);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    return this.publicationService.delete(Number(id), req.user);
  }
}
