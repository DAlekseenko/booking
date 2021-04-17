import {Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Query} from '@nestjs/common';
import {RoomsService} from "./rooms.service";
import {BookingDto} from "./booking.dto";
import {AvailableDto} from "./available.dto";


enum Paths {
    GetAvailableByDates = 'getAvailableByDates',
    BookRoom = 'bookRoom'
}

@Controller('rooms')
export class RoomsController {
    constructor(private roomService: RoomsService) {
    }

    private static validateRequest(start: Date, end: Date) {
        if (isNaN(start.valueOf()) || isNaN(end.valueOf())) {
            throw new HttpException('Bad request params', HttpStatus.BAD_REQUEST);
        }
        if (start > end) {
            throw new HttpException('Date start should be more date end', HttpStatus.BAD_REQUEST);
        }
    }

    @Get(Paths.GetAvailableByDates)
    async getAvailableByDates(@Query() availableDto: AvailableDto) {
        const {start, end} = availableDto
        const dateStart = new Date(start);
        const dateEnd = new Date(end);

        RoomsController.validateRequest(dateStart, dateEnd)

        return this.roomService.getRoomByDate(dateStart, dateEnd);
    }

    @Post(Paths.BookRoom)
    @HttpCode(HttpStatus.ACCEPTED)
    async bookRoom(@Body() bookingDto: BookingDto) {
        const {start, end} = bookingDto
        const dateStart = new Date(start);
        const dateEnd = new Date(end);

        RoomsController.validateRequest(dateStart, dateEnd)

        const err = await this.roomService.bookRoom(bookingDto)

        if (err) {
            throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
        }

    }
}
