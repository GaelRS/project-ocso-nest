import { IsEmail, IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";

export class CreateEmployeeDto extends Employee{
    @IsString()
    @IsUUID("4")
    @IsOptional()
    id: string;
    @IsString()
    @MaxLength(20)
    employeeName: string;
    @IsString()
    @MaxLength(20)
    employeeLastName: string;
    @IsString()
    @MaxLength(10)
    employeePhoneNumber: string;
    @IsString()
    @IsEmail()
    employeeEmail: string;
    @IsOptional()
    @IsObject()
    location: Location;
}
