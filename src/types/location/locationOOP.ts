import { ApiProperty } from '@nestjs/swagger';

export class Location {
  // @ApiProperty({description: 'id', type: Number })
  // id?: number
  @ApiProperty({ description: 'id', type: String })
  location_name: string;
  @ApiProperty({ description: 'city', type: String })
  city?: string;
  @ApiProperty({ description: 'nation', type: String })
  nation?: string;
  @ApiProperty({ description: 'image', type: String, format: 'binary' })
  image?: any
}

export class LocationQueriesClass {
  @ApiProperty({ description: 'pageSize', type: Number, required: false })
  pageSize?: number;
  @ApiProperty({ description: 'pageIndex', type: Number, required: false })
  pageIndex?: number;
  @ApiProperty({ description: 'keyword', type: String, required: false })
  keyword?: string;
  @ApiProperty({ description: 'orderBy', type: String, required: false })
  orderBy?: string;
}
