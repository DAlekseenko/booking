import { ApiProperty } from '@nestjs/swagger';

export class BookingAvailableDto {

    @ApiProperty()
    start: string;

    @ApiProperty()
    end: string;
}