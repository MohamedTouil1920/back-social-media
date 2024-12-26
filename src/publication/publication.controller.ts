import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, Req, UsePipes, Put, Param, Delete } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { FileValidationPipe } from './File-Valdaion-Pipe';
import { mediaInterceptor } from './media.interceptor';
import { AuthGuard } from './../auth/auth.guard';

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(mediaInterceptor)
  @UsePipes(FileValidationPipe)
  async create(
    @Body() createPublicationDto: CreatePublicationDto,
    @UploadedFile() myMedia: Express.Multer.File,
    @Req() req,
  ) {
    const mediaUrl = myMedia ? `/uploads/${myMedia.filename}` : null;
    const mediaType = myMedia ? myMedia.mimetype.startsWith('image') ? 'image' : 'video' : null;
    return this.publicationService.create(createPublicationDto, req.user.id, mediaUrl, mediaType);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(mediaInterceptor)
  @UsePipes(FileValidationPipe)
  async update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
    @UploadedFile() myMedia: Express.Multer.File,
    @Req() req,
  ) {
    const mediaUrl = myMedia ? `/uploads/${myMedia.filename}` : null;
    const mediaType = myMedia ? myMedia.mimetype.startsWith('image') ? 'image' : 'video' : null;
    return this.publicationService.update(Number(id), updatePublicationDto, req.user, mediaUrl, mediaType);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    return this.publicationService.delete(Number(id), req.user);
  }
}
