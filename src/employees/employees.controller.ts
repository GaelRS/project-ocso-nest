import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Express } from 'express';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.docorator';
import { ROLES } from 'src/auth/constants/role.constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { ApiAuth } from 'src/auth/decorators/api.decorator';

@ApiAuth()  
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      id:"UUID",
      employeeName: "Gael",
      employeeLastName: "Rosas",
      employeeEmail: "rosasgael03@gmail.com",
      employeePhoneNumber: "4423578543"
    } as Employee
  })

  
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id',new ParseUUIDPipe({version: '4'})) 
  id: string) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Get('location/:id')
  findAllLocation(@Param('id')id: string){
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version:'4'})) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) {
    return this.employeesService.remove(id);
  }
}
