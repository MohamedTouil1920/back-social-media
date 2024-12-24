import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Publication } from '../../publication/entities/publication.entity';
import { Like } from '../../like/entities/like.entity';

@Entity()
export class Commentaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.commentaires)
  user: User;

  @ManyToOne(() => Publication, (publication) => publication.commentaires)
  publication: Publication;

  @OneToMany(() => Like, (like) => like.commentaire)
  likes: Like[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
