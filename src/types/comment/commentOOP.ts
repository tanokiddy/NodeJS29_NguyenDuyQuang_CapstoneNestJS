import { ApiProperty } from "@nestjs/swagger"

export class CommentDetailClass {
    @ApiProperty({ description: 'job_code', type: String })
    job_code?: string
    @ApiProperty({ description: 'user_id', type: Number })
    user_id?: number
    @ApiProperty({ description: 'room_id', type: Number })
    room_id?: number
    @ApiProperty({ description: 'date_comment', type: String, format: 'date-time' })
    date_comment?: string
    @ApiProperty({ description: 'text_comment', type: String })
    text_comment?: string
    @ApiProperty({ description: 'rate_comment', type: Number })
    rate_comment?: number
}