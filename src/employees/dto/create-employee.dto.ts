import { IsEmail, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";



export class CreateEmployeeDto extends Employee{
    @ApiProperty()
    @IsString()
    @IsUUID("4")
    @IsOptional()
    id: string;

    @ApiProperty()
    @IsString()
    @MaxLength(20)
    employeeName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(20)
    employeeLastName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    employeePhoneNumber: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    employeeEmail: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    location: Location;
}


