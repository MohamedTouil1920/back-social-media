import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/creat-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
  
  @Get(':email')
  find(@Param('email') email: string) {
    console.log(email);
    const user= this.usersService.findOneByEmail(email);
    console.log(user);
    return user;
}
}
