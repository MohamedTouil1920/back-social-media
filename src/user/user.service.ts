
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from './dto/creat-user.dto';

@Injectable()
export class UsersService {
 
 

  
  constructor(
    @InjectRepository(User)
    private  usersRepository: Repository<User>,
  ) {}
  findById(id: number) {
    throw new Error('Method not implemented.');
  }
  

  
  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }
  
  async findOneByEmail(email: string):  Promise<User | undefined> {
    const user= await this.usersRepository.findOneBy({email});
    return user;
    
 
  
  }

  async findall(){
    return await this.usersRepository.find();
  }
}
