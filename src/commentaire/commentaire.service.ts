import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Commentaire } from './entities/commentaire.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommentaireService {
  constructor(
    @InjectRepository(Commentaire)
    private  commentaireRepository: Repository<Commentaire>,
  ){}
  // creation de commentaire
  async create(_createcommentaireDto: CreateCommentaireDto, user: User, mediaUrl: string, mediaType: string): Promise<Commentaire> {
    const commentaire = this.commentaireRepository.create({
      ...CreateCommentaireDto,
      user,
      mediaUrl,
      mediaType,
    });
    return await this.commentaireRepository.save(commentaire);
  }
  // recheche de commentaire selon la pub

  async findByPublication(publicationId: number): Promise<Commentaire[]> {
    return await this.commentaireRepository.find({
      where: { publication: { id: publicationId } },
      relations: ['user', 'publication'],
    });
  }
// recherche de commentaire par user 

async findByUser(userId: number): Promise<Commentaire[]> {
  return await this.commentaireRepository.find({
    where: { user: { id: userId } },
    relations: ['user', 'publication'],
  });
}
// mise a jour de commentaire
async update(id: number, updateCommentaireDto: UpdateCommentaireDto): Promise<Commentaire> {
  const commentaire = await this.commentaireRepository.preload({
    id,
    ...updateCommentaireDto,
  });

  if (!commentaire) {
    throw new NotFoundException(`Commentaire with ID ${id} not found`);
  }

  return await this.commentaireRepository.save(commentaire);
}

// suppression de commentaire
async remove(id: number): Promise<void> {
  const commentaire = await this.commentaireRepository.findOne({where:{id}});

  if (!commentaire) {
    throw new NotFoundException(`Commentaire with ID ${id} not found`);
  }

  await this.commentaireRepository.delete(id);
}
}

