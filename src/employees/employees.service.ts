import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
  @InjectRepository(Employee)
  private employeeRepository: Repository<Employee>){}

  
  async create(createEmployeeDto: CreateEmployeeDto) {
    
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findByLocation(id: number) {
    return this.employeeRepository.findBy({
      location: { 
        locationId: id
      }
    });
  }

  async findOne(id: string) {
    const employeeFound = this.employeeRepository.findOne({ where: { id } });
    if (!employeeFound) throw new NotFoundException();
    return employeeFound;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeUpdated = await this.employeeRepository.preload({
      id,
      ...updateEmployeeDto
    });
    if (!employeeUpdated) throw new NotFoundException();
    this.employeeRepository.save(employeeUpdated);
    return employeeUpdated;
  }

  async remove(id: string) {  
    const employeeFound = await this.employeeRepository.findOne({ where: { id } });
    if (!employeeFound) throw new NotFoundException();
    await this.employeeRepository.remove(employeeFound);
    return {
      message: `Objeto con id ${id} eliminado`
    }
  }
}
