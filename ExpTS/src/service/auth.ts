import { PrismaClient, User } from "@prisma/client";
import { LoginDto } from "../types/auth";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const checkAuth = async (credential: LoginDto) => {
  const user = await prisma.user.findUnique({
    where: { email: credential.email },
  });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(credential.password, user.password);
  return isMatch ? user : null;
};
