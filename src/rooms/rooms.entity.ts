import {Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Booking} from "./booking.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Booking, booking => booking.room_id)
    bookings: Booking[];
}