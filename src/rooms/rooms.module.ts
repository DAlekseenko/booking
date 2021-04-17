import {Module} from '@nestjs/common';
import {RoomsService} from './rooms.service';
import {RoomsController} from './rooms.controller';
import {DatabaseModule} from "../database/datbase.module";
import {roomProviders} from "./rooms.providers";

@Module({
    imports: [DatabaseModule],
    providers: [...roomProviders, RoomsService],
    controllers: [RoomsController]
})
export class RoomsModule {
}
