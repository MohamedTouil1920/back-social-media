import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../dto/creat-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}