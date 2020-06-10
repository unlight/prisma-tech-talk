import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
    {
        const allUsers = await prisma.user.findMany();
        const [{ posts }] = allUsers; // Property 'posts' does not exist on type 'User'.
    }
    {
        const allUsersWithPosts = await prisma.user.findMany({
            include: { posts: true },
        });
        const [{ posts }] = allUsersWithPosts; // No errors
    }
})();
