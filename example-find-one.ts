import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
    {
        const user = await prisma.user.findOne({ where: { id: 1 } });
        console.log('user.email', user.email);
    }
    {
        const user = await prisma.user.findOne({
            where: { id: 1 },
            select: { id: true, name: true },
        });
        // Compile time error: Property 'email' does not exist on type '{ id: number; name: string; }'.
        console.log('user.email', user.email);
    }
})();
