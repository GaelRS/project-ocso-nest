import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @IsUUID("4")
    @IsOptional()
    id: string;
    @IsString()
    @MaxLength(20)
    name: string;
    @IsString()
    @MaxLength(20)
    lastName: string;
    @IsString()
    @MaxLength(10)
    phoneNumber: string;
}
