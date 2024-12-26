import { Like } from './../../like/entities/like.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Publication } from './../../publication/entities/publication.entity';
import { Commentaire } from './../../commentaire/entities/commentaire.entity';

@Entity('user')
export class User {
  @Column({primary:true,generated:true})
  id: number;

  @Column({ unique: true , nullable: false})
  email: string;

  @Column({ nullable: false })
  password: string;

 

  @Column()
  firstName: string;

  @Column()
  LastName: string;
 
  @Column({default:"user"})
    role:string;
      // Relations avec les publications
  @OneToMany(() => Publication, (publication) => publication.author)
  publications: Publication[];

  // Relations avec les commentaires
  @OneToMany(() => Commentaire, (commentaire) => commentaire.user)
  commentaires: Commentaire[];

  // Relations avec les likes
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];



  // Système de follow
  @ManyToMany(() => User)
  @JoinTable()
  following: User[];

  @ManyToMany(() => User)
  @JoinTable()
  followers: User[];
    notifications: any;
}

 
