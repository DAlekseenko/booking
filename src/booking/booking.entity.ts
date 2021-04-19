import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column('int')
    room_id: number;

    @Column({type: "timestamp", precision: 6, nullable: true})
    start: Date;

    @Column( {type: "timestamp", precision: 6, nullable: true} )
    end: Date;

}