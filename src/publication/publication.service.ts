import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PublicationService {
  constructor( 
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}

  // Création d'une publication
  async create(createPublicationDto: CreatePublicationDto, user: User, mediaUrl: string, mediaType: string): Promise<Publication> {
    console.log(user)
    const publication = this.publicationRepository.create({...createPublicationDto,author:user,mediaUrl:mediaUrl,mediaType:mediaType})
    return await this.publicationRepository.save(publication);
  }

  // Recherche de toutes les publications avec les relations
  async findAll(): Promise<Publication[]> {
    return await this.publicationRepository.find({
      relations: ['user', 'comments', 'likes'],
    });
  }

  // Recherche d'une publication par ID avec les relations
  async findOne(id: number): Promise<Publication> {
    const pub = await this.publicationRepository.findOne({
      where: { id },
      relations: ['user', 'commentaires', 'likes'],
    });
    if (!pub) {
      throw new NotFoundException(`Pub with ID ${id} not found`);
    }
    return pub;
  }

  // Mise à jour d'une publication
  async update(id: number, updatePublicationDto: UpdatePublicationDto, user, mediaUrl: string, mediaType: string): Promise<Publication> {
    const pub = await this.publicationRepository.findOne({where : {id}});
    if (!pub) {
      throw new NotFoundException(`Publication with ID ${id} not found`);
    }

    Object.assign(pub, {
      ...updatePublicationDto,
      user,
      mediaUrl,
      mediaType,
    });
    return this.publicationRepository.save(pub);
  }

  

  // Suppression d'une publication
  async delete (id: number, user?: any): Promise<void> {
    const publication = await this.findOne(id);
    if (!publication) {
      throw new NotFoundException(`Publication with ID ${id} not found`);
    }

    await this.publicationRepository.delete(id);
  }
}
