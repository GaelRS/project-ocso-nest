import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { Manager } from 'src/managers/entities/manager.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,

    private jwtService: JwtService) {}

  async registerEmployee(id: string,createUserDto: CreateUserDto) {
    createUserDto.userPassword = bycrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.userRepository.save(createUserDto);
    const employee = await this.employeeRepository.preload({
      id : id,
    });
    if (!employee) {
      throw new Error('Employee not found');
    }
    employee.user = user;
    return this.employeeRepository.save(employee);
  }

  async registerManager(id: string,createUserDto: CreateUserDto) {
    createUserDto.userPassword = bycrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.userRepository.save(createUserDto);
    const manager = await this.managerRepository.preload({
      managerId : id,
    });
    if (!manager) {
      throw new Error('Manager not found');
    }
    manager.user = user;
    return this.managerRepository.save(manager);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    
    const user = await this.userRepository.findOne({
      where:{
        userEmail: loginUserDto.userEmail
      }
    })
    if (user) {
      if(!user) throw new UnauthorizedException("No estas autorizado");
      const match = await bycrypt.compare(loginUserDto.userPassword, user.userPassword);
      if(!match) throw new UnauthorizedException("No estas autorizado");
      const payload = {
        userEmail: user.userEmail,
        userPassword: user.userPassword,
        userRoles: user.userRoles
      };
      const token = this.jwtService.sign(payload);
      return token;
      
    } 
    
  }

  async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
    const newUserData = await this.userRepository.preload({
      userEmail,
      ...updateUserDto
    });
    if (!newUserData) throw new Error('User not found');
    
    this.userRepository.save(newUserData);
    return newUserData;
  }
}
