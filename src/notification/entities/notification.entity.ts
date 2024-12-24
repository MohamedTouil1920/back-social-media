import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Publication } from '../../publication/entities/publication.entity';
import { Commentaire } from '../../commentaire/entities/commentaire.entity';


@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'triggered_by_id' })
  triggeredBy: User;

  @ManyToOne(() => Publication)
  @JoinColumn({ name: 'publication_id' })
  publication: Publication;

  @ManyToOne(() => Comment)
  @JoinColumn({ name: 'comment_id' })
  commentaire: Commentaire;

  @Column()
  type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ default: false })
  isRead: boolean;
}

