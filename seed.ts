import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
    console.log('Seeding...');
    await prisma.$connect();

    // Users
    const ivan = await prisma.user.create({
        data: {
            name: 'Ivan',
            email: 'ivan@mail.com',
        },
    });

    await prisma.post.create({
        data: {
            title: 'Anklebone',
            content:
                'anklebone vacuolate tamelessly teachably palatalize obnoxious',
            published: true,
            author: {
                connect: {
                    id: ivan.id,
                },
            },
        },
    });

    await prisma.post.findMany({
        where: {
            id: { gt: 1 },
            OR: [{ title: { contains: 'prisma' } }, { id: { gt: 1 } }],
        },
    });

    const postsByAuthorWithAuthorInfo = await prisma.post.findMany({
        include: {
            author: true,
        },
    });

    await prisma.$disconnect();
})();
