import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UserCreateDto } from "../types/user";

const prisma = new PrismaClient();

export const createUser = async (user: UserCreateDto): Promise<User> => {
  const salt = await bcrypt.genSalt(parseInt(process.env.ROUNDS!));
  const password = await bcrypt.hash(user.password, salt);
  return await prisma.user.create({ data: { ...user, password } });
};
