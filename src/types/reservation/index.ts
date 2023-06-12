import { reservation } from "@prisma/client";

export interface ReservationDetail extends Omit<reservation, 'id' | 'date_in' | 'date_out'> {
    id?: number
    date_in: string,
    date_out: string
}