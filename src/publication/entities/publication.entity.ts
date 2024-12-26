import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { Commentaire } from 'src/commentaire/entities/commentaire.entity';
import { Like } from './../../like/entities/like.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, user => user.publications) // Define the relation here
  @JoinColumn({ name: 'author' })
  author: User;

  @OneToMany(() => Like, (like) => like.id)
  likes: Like[];

  @OneToMany(() => Commentaire, (commentaire) => commentaire.publication)
  commentaires: Commentaire[];

  @Column()
  mediaUrl?: string; // Ajout du mediaUrl
  @Column()
  mediaType?: string; // Ajout du mediaType


  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  commentairesCount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
