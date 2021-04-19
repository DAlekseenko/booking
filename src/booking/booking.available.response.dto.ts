import { ApiProperty } from '@nestjs/swagger';

export class BookingAvailableResponseDto {

    @ApiProperty()
    Room_id: number;
}