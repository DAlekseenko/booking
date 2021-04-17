import {Injectable, Inject} from '@nestjs/common';
import { Repository } from 'typeorm';
import {Room} from "./rooms.entity";
import {provideBooking, provideRoom} from "./rooms.providers";
import {Booking} from "./booking.entity";

/**
 * SELECT id
 from room
 WHERE id NOT IN(
 SELECT room_id
 from booking as b
 WHERE NOT(to_timestamp('2021-04-15', 'YYYY-MM-DD') > b.end
 OR to_timestamp('2021-04-18', 'YYYY-MM-DD') < b.start));
 */

@Injectable()
export class RoomsService {

    constructor(
        @Inject(provideRoom)
        private roomRepository: Repository<Room>,
        @Inject(provideBooking)
        private bookingRepository: Repository<Booking>,
    ) {}

    async getRoomByDate(start: Date, end: Date) {

        const result = await this.roomRepository.createQueryBuilder("room").
            where("id NOT IN(SELECT room_id\n" +
            " from booking as b NOT(to_timestamp('2021-04-15', 'YYYY-MM-DD') > b.end\n" +
            " OR to_timestamp('2021-04-18', 'YYYY-MM-DD') < b.start))")
        return result
    }

    async bookRoom(id: number, start: Date, end: Date) {
        return {
            start,
            end,
            id
        }
    }
}
