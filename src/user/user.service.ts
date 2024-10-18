// users.service.ts
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
    console.log('Searching for email:', email);
    const user= await this.usersRepository.findOneBy({email});
    console.log(user);
    return user;
    
 
  
  }

  async findall(){
    return await this.usersRepository.find();
  }
}
