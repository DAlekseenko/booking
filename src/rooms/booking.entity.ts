import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column('int')
    room_id: number;

    @Column('timestamp')
    start: string;

    @Column('timestamp')
    end: string;

}