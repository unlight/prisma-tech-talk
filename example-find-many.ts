import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
    {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { startsWith: 'a' } },
                    { name: { endsWith: 'z' } },
                ],
                name: { contains: 'n' },
            },
        });
        const [{ posts }] = users; // Property 'posts' does not exist on type 'User'.
    }
    {
        const allUsersWithPosts = await prisma.user.findMany({
            include: { posts: true },
        });
        const [{ posts }] = allUsersWithPosts; // No errors
    }
    {
        const postsByAuthorWithAuthorInfo = await prisma.post.findMany({
            where: {
                author: { id: 42 },
            },
            include: {
                author: true,
            },
        });
    }
})();
