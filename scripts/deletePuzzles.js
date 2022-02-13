const PrismaClient = require('@prisma/client').PrismaClient;


(async () => {
    const client = new PrismaClient();
    await client.puzzle.deleteMany()
})()