import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Publication } from 'src/publication/entities/publication.entity';

import { Commentaire } from 'src/commentaire/entities/commentaire.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  // Relation avec l'utilisateur qui a créé le "like"
  @ManyToOne(() => User, user => user.likes, { eager: true, onDelete: 'CASCADE' })
  user: User;

  // Relation optionnelle avec un post
  @ManyToOne(() => Publication, post => post.likes, { nullable: true, onDelete: 'CASCADE' })
  post: Publication;

  // Relation optionnelle avec un commentaire
  @ManyToOne(() => Commentaire, comment => comment.likes, { nullable: true, onDelete: 'CASCADE' })
  comment: Commentaire;
}
