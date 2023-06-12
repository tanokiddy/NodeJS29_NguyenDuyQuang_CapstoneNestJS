import { users } from "@prisma/client";

export type FilteredUser = Omit<users, 'pass_word'>

export interface UserDetail extends Omit<users, 'id'> {
    id?: number
}

export interface UserUpdate extends UserDetail {
    old_pw: string
}