import { ApiProperty } from '@nestjs/swagger';

export class ReservationDetailClass {
  // @ApiProperty({description: 'id', type: Number })
  //   id?: number;
  @ApiProperty({ description: 'room_id', type: Number })
  room_id: number;
  @ApiProperty({ description: 'date_in', type: String, format: 'date-time' })
  date_in: string;
  @ApiProperty({ description: 'date_out', type: String, format: 'date-time' })
  date_out?: string;
  @ApiProperty({ description: 'guest_number', type: Number })
  guest_number?: number;
  @ApiProperty({ description: 'user_id', type: Number })
  user_id?: number;
}

export class UserId {
  @ApiProperty({ description: 'user_id', type: Number })
  user_id?: number;
}
