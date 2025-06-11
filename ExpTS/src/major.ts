import { PrismaClient, Major } from "@prisma/client";
import { CreateMajorDto, UpdateMajorDto } from "../types/major";

const prisma = new PrismaClient();

export const createMajor = async (major: CreateMajorDto): Promise<Major> => {
  return prisma.major.create({ data: major });
};

export const getMajors = async (): Promise<Major[]> => {
  return prisma.major.findMany();
};

export const getMajor = async (id: string): Promise<Major | null> => {
  return prisma.major.findUnique({ where: { id } });
};

export const updateMajor = async (id: string, updatedMajor: UpdateMajorDto) => {
  return await prisma.major.update({ where: { id }, data: updatedMajor });
};

export const deleteMajor = async (id: string) => {
  return await prisma.major.delete({ where: { id } });
};
