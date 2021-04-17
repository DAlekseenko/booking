import { ApiProperty } from '@nestjs/swagger';

export class BookingDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    start: string;

    @ApiProperty()
    end: string;
}