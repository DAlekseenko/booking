import {Connection} from 'typeorm';
import {Booking} from './booking.entity';
import {Room} from "../rooms/rooms.entity";
import {connectionProvider} from "../database/database.providers";

export const provideRoom = 'ROOM_REPOSITORY'
export const provideBooking = 'BOOKING_REPOSITORY'

export const bookingProviders = [
    {
        provide: provideRoom,
        useFactory: (connection: Connection) => connection.getRepository(Room),
        inject: [connectionProvider],
    },
    {
        provide: provideBooking,
        useFactory: (connection: Connection) => connection.getRepository(Booking),
        inject: [connectionProvider],
    },
];