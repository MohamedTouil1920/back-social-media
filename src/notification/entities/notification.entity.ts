import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Publication } from '../../publication/entities/publication.entity';
import { Commentaire } from 'src/commentaire/entities/commentaire.entity';


@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'triggeredBy' })
  triggeredBy: User;

  @ManyToOne(() => Publication)
  @JoinColumn({ name: 'publication' })
  publication: Publication;

  @ManyToOne(() => Commentaire)
  @JoinColumn({ name: 'comment' })
  commentaire: Commentaire;

  @Column()
  type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ default: false })
  isRead: boolean;
}

