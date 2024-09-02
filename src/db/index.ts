import { PrismaClient } from "@prisma/client";
//now we can use the prisma client all around our app
export const db = new PrismaClient();