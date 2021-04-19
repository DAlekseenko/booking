import {Injectable, Inject} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Room} from "../rooms/rooms.entity";
import {provideBooking, provideRoom} from "./booking.providers";
import {Booking} from "./booking.entity";

@Injectable()
export class BookingService {

    constructor(
        @Inject(provideRoom)
        private roomRepository: Repository<Room>,
        @Inject(provideBooking)
        private bookingRepository: Repository<Booking>,
    ) {
    }

    getFreeRoomsByDate(start: Date, end: Date) {
        return this.bookingRepository.createQueryBuilder("booking")
            .select('room_id')
            .where(
                "NOT(:start > booking.end OR :end < booking.start)"
            ).setParameters({start: start.toISOString(), end: end.toISOString()});
    }

    async getRoomByDate(start: Date, end: Date) {

        const result = this.roomRepository.createQueryBuilder()
            .select()
            .where('id NOT IN(' + this.getFreeRoomsByDate(start, end).getQuery() + ')')
            .setParameters({start: start.toISOString(), end: end.toISOString()})

        return await result.getRawMany()
    }

    async bookRoom(id: number, start: Date, end: Date) {

        const bookedRooms = await this.getFreeRoomsByDate(start, end).getRawMany()

        if (bookedRooms.some(item => item.room_id == id)) {
            return "Room not access to booking to that these dates are"
        }
        const res = await this.bookingRepository.save({
            room_id: id,
            start,
            end,
        })
    }
}
