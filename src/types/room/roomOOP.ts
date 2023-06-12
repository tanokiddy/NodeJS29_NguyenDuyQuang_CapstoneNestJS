import { ApiProperty } from "@nestjs/swagger";

export class RoomDetail {
    // @ApiProperty({description: 'id', type: Number })
    // id?: number
    @ApiProperty({description: 'room_name', type: String })
    room_name: string
    @ApiProperty({description: 'email', type: Number })
    location_id: number
    @ApiProperty({description: 'guest_number', type: Number })
    guest_number: number
    @ApiProperty({description: 'bed_room', type: Number })
    bed_room: number
    @ApiProperty({description: 'bed', type: Number })
    bed: number
    @ApiProperty({description: 'bath_room', type: Number })
    bath_room: number
    @ApiProperty({description: 'price', type: Number })
    price: number
    @ApiProperty({description: 'washer', type: Boolean })
    washer: boolean
    @ApiProperty({description: 'iron', type: Boolean })
    iron: boolean
    @ApiProperty({description: 'television', type: Boolean })
    television: boolean
    @ApiProperty({description: 'air_conditioner', type: Boolean })
    air_conditioner: boolean
    @ApiProperty({description: 'wifi', type: Boolean })
    wifi: boolean
    @ApiProperty({description: 'kitchen', type: Boolean })
    kitchen: boolean
    @ApiProperty({description: 'car_park', type: Boolean })
    car_park: boolean
    @ApiProperty({description: 'spool', type: Boolean })
    spool: boolean
    @ApiProperty({description: 'flat_iron', type: Boolean })
    flat_iron: boolean
    @ApiProperty({description: 'description', type: String })
    description: string
    @ApiProperty({description: 'image', format: 'binary', type: String })
    image: any
    // @ApiProperty({description: 'user_id', type: Number })
    // user_id: number
}