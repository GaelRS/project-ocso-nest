import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";


export class CreateManagerDto extends Manager{
    @IsString()
    @MaxLength(80)
    managerFullName: string;
    @IsNumber()
    managerSalary: number;
    @IsString()
    @IsEmail()
    managerEmail: string;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
    @IsNumber()
    @IsOptional()
    location: Location;
}
