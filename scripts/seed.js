const fs = require('fs');
const PrismaClient = require('@prisma/client').PrismaClient;

fs.readFile((__dirname + '/wordle_words.txt'), 'utf-8', async (err, data) => {
    client = new PrismaClient();
    words = data.split('\n');
    await client.puzzle.createMany({
        data: words.map((w, i) => ({word: w, number: i + 1}))
    });
});