import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Like } from '../../like/entities/like.entity';

import { Commentaire } from 'src/commentaire/entities/commentaire.entity';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, user => user.publications) // Define the relation here
  @JoinColumn({ name: 'user_id' })
  author: User;

  @OneToMany(() => Like, (like) => like.publication)
  likes: Like[];

  @OneToMany(() => Commentaire, (commentaire) => commentaire.publication)
  commentaires: Commentaire[];

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  commentairesCount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
