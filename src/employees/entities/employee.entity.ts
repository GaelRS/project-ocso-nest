import { User } from 'src/auth/entities/user.entity';
import { Location } from 'src/locations/entities/location.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type:'text'})
    name: string;
    @Column({type:'text'})
    lastName: string;
    @Column({type:'text'})
    phoneNumber: string;
    @Column({type:'text'})
    email: string;
    @Column({
        type:'text',
        nullable: true
    })
    photoUrl: string;


    @ManyToOne(() => Location, (location)=>location.employees)
    @JoinColumn({
        name: 'locationId',
    })
    location: Location;

    @OneToOne(() => User)
    @JoinColumn({
        name: 'userId'
    })
    user: User;
    
}
