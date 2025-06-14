import {User} from "@prisma/client";

export type LoginDto = Pick<User, "email" | "password">;
