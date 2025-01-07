import app from "./app.js";
import prisma from './helpers/prismaClient.js';

async function main() {

    try {
        // test database connection
        await prisma.$connect();
        console.log('Connection has been established successfully.');

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server '${app.get("appName")}' listening on port ${process.env.PORT || 3000}`);
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main()