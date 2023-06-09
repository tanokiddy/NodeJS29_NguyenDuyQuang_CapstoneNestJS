import { ApiProperty } from "@nestjs/swagger";

export class RoomDetail {
    // @ApiProperty({description: 'id', type: Number })
    id?: number
    @ApiProperty({description: 'email', type: Number })
    location_id: number
    @ApiProperty({description: 'room_name', type: String })
    room_name: string
    @ApiProperty({description: 'guest_number', type: Number })
    guest_number: number
    @ApiProperty({description: 'bed_room', type: Number })
    bed_room: number
    @ApiProperty({description: 'bed', type: Number })
    bed: number
    @ApiProperty({description: 'bath_room', type: Number })
    bath_room: number
    @ApiProperty({description: 'description', type: String })
    description: string
    @ApiProperty({description: 'price', type: Number })
    price: number
    @ApiProperty({description: 'washer', type: Number })
    washer: number
    @ApiProperty({description: 'iron', type: Number })
    iron: number
    @ApiProperty({description: 'television', type: Number })
    television: number
    @ApiProperty({description: 'air_conditioner', type: Number })
    air_conditioner: number
    @ApiProperty({description: 'wifi', type: Number })
    wifi: number
    @ApiProperty({description: 'kitchen', type: Number })
    kitchen: number
    @ApiProperty({description: 'car_park', type: Number })
    car_park: number
    @ApiProperty({description: 'spool', type: Number })
    spool: number
    @ApiProperty({description: 'flat_iron', type: Number })
    flat_iron: number
    @ApiProperty({description: 'image', type: Number })
    image: string
    @ApiProperty({description: 'user_id', type: Number })
    user_id: number
}