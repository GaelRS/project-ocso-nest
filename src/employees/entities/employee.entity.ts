import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
}
