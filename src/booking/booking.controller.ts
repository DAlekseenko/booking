import {Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Query} from '@nestjs/common';
import {BookingService} from "./booking.service";
import {BookingDto} from "./booking.dto";
import {BookingAvailableDto} from "./booking.available.dto";
import {ApiOkResponse} from "@nestjs/swagger";
import {BookingAvailableResponseDto} from "./booking.available.response.dto";


enum Paths {
    GetAvailableByDates = 'getAvailableByDates',
    BookRoom = 'bookRoom'
}

@Controller('booking')
export class BookingController {
    constructor(private roomService: BookingService) {
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
    @ApiOkResponse({type: BookingAvailableResponseDto, isArray: true, description: 'Available room ids'})
    async getAvailableByDates(@Query() availableDto: BookingAvailableDto) {
        const {start, end} = availableDto
        const dateStart = new Date(start);
        const dateEnd = new Date(end);

        BookingController.validateRequest(dateStart, dateEnd)

        return this.roomService.getRoomByDate(dateStart, dateEnd);
    }

    @Post(Paths.BookRoom)
    @HttpCode(HttpStatus.ACCEPTED)
    async bookRoom(@Body() bookingDto: BookingDto) {
        const {start, end, id} = bookingDto
        const dateStart = new Date(start);
        const dateEnd = new Date(end);

        BookingController.validateRequest(dateStart, dateEnd)

        const err = await this.roomService.bookRoom(id, dateStart, dateEnd)

        if (err) {
            throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
        }

    }
}
