import { ApiProperty } from '@nestjs/swagger';

export class AvailableDto {

    @ApiProperty()
    start: string;

    @ApiProperty()
    end: string;
}