import { User } from 'src/auth/entities/user.entity';
import { Location } from 'src/locations/entities/location.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type:'text'})
    employeeName: string;
    @Column({type:'text'})
    employeeLastName: string;
    @Column({type:'text'})
    employeePhoneNumber: string;
    @Column({type:'text', unique: true})
    employeeEmail: string;
    @Column({
        type:'text',
        nullable: true
    })
    employeePhoto: string;


    @ManyToOne(() => Location, (location)=>location.employees)
    @JoinColumn({
        name: 'locationId',
    })
    location: Location | string;

    @OneToOne(() => User)
    @JoinColumn({
        name: 'userId'
    })
    user: User;
    
}
