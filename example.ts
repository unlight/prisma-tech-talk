import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
    const allUsers = await prisma.user.findMany();
})();
