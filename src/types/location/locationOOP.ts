import { ApiProperty } from "@nestjs/swagger"

export class Location {
    @ApiProperty({description: 'id', type: Number })
    id?: number
    @ApiProperty({description: 'id', type: String })
    location_name: string
    @ApiProperty({description: 'city', type: String })
    city: string
    @ApiProperty({description: 'nation', type: String })
    nation: string
    @ApiProperty({description: 'image', type: String })
    image: string
}