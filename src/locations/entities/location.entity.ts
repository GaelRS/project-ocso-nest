import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: "Ocso Juriquilla"
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        default: "Av. Jurica"
    })
    @Column('text')
    locationAddress: string;

    @ApiProperty({
        default: [12,12]
    })
    @Column('simple-array')
    locationLatLng: number[];

    @ApiProperty({
        default: "df6af10f-154c-4791-a698-ddcaf391d52b"
    })
    @OneToOne(() => Manager,{
        eager: true
    })
    @JoinColumn({
        name: 'managerId',
    })
    managerId: Manager | string;

    @ManyToOne(() => Region, (region)=> region.locations)
    @JoinColumn({
        name: 'regionId',
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];

}
