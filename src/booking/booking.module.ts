import {Module} from '@nestjs/common';
import {BookingService} from './booking.service';
import {BookingController} from './booking.controller';
import {DatabaseModule} from "../database/datbase.module";
import {bookingProviders} from "./booking.providers";

@Module({
    imports: [DatabaseModule],
    providers: [...bookingProviders, BookingService],
    controllers: [BookingController]
})
export class BookingModule {
}
