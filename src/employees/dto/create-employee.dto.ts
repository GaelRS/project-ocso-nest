import { IsEmail, IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateEmployeeDto {
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
}
