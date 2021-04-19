import {Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Booking} from "../booking/booking.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Booking, booking => booking.room_id, { cascade:true })
    bookings: Booking[];
}