import { User } from "@prisma/client";

export type UserCreateDto = Pick<User, "email" | "password" | "name" | 'majorId'>;