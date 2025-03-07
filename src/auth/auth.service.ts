import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { json } from 'stream/consumers';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>) {}

  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bycrypt.hashSync(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }

  async loginUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where:{
        userEmail: createUserDto.userEmail
      }
    })
    if (user) {

      const match = await bycrypt.compare(createUserDto.userPassword, user.userPassword);
      if(!match) throw new UnauthorizedException("No estas autorizado");
      const token = jwt.sign(JSON.stringify(user),"SECRET KEY");
      return token;
    } else {
      throw new Error('User not found or password is missing');
    }
  }
}
