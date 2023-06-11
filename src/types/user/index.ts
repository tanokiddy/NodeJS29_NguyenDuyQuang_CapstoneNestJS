import { users } from "@prisma/client";

export type FilteredUser = Omit<users, 'pass_word'>