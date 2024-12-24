import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationService } from '../notification/notification.service';
import { Like } from '../like/entities/like.entity';
import { Publication } from 'src/publication/entities/publication.entity';

import { User } from 'src/user/entities/user.entity';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Publication)
    private postsRepository: Repository<Publication>,
    @InjectRepository(Comment)
    private commentairesRepository: Repository<Commentaire>,
    private notificationsService: NotificationService,
  ) {}

  async toggleLikeOnPost(postId: number, userId: number): Promise<Publication> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['author', 'likes'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (!post.likes) {
      post.likes = [];
    }

    const likeIndex = post.likes.findIndex(like => like.user.id === userId);
    if (likeIndex === -1) {
      const newLike = new Like();
      newLike.user = { id: userId } as User;
      post.likes.push(newLike);

      if (post.author.id !== userId) {
        await this.notificationsService.create({
          userId: post.author.id,
          type: 'LIKE',
          triggeredById: userId,
          publicationId: postId,
        });
      }
    } else {
      post.likes.splice(likeIndex, 1);
    }

    return this.postsRepository.save(post);
  }

  async toggleLikeOnComment(commentId: number, userId: number): Promise<Commentaire> {
    const comment = await this.commentairesRepository.findOne({
      where: { id: commentId },
      relations: ['author', 'likes'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (!comment.likes) {
      comment.likes = [];
    }

    const likeIndex = comment.likes.findIndex(like => like.user.id === userId);
    if (likeIndex === -1) {
      const newLike = new Like();
      newLike.user = { id: userId } as User;
      comment.likes.push(newLike);

      if (comment.author.id !== userId) {
        await this.notificationsService.create({
          userId: comment.author.id,
          type: 'LIKE',
          triggeredById: userId,
          commentId: commentId,
        });
      }
    } else {
      comment.likes.splice(likeIndex, 1);
    }

    return this.commentairesRepository.save(comment);
  }
}
