import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends({
    name: 'UserFullNameExtension',
    query: {
        user: {
            async create({ args, query }) {
                const { name, paternalSurname = '', maternalSurname = '' } = args.data;
                args.data.fullName = [name, paternalSurname, maternalSurname].filter(Boolean).join(' ');
                return query(args);
            },
            async update({ args, query }) {

                const existingUser = await prisma.user.findUnique({
                    where: { id: args.where.id },
                });

                if (!existingUser) {
                    throw new Error('User not found');
                }
                const { name = existingUser.name, paternalSurname = existingUser.paternalSurname, maternalSurname = existingUser.maternalSurname } = args.data;
                args.data.fullName = [name, paternalSurname, maternalSurname].filter(Boolean).join(' ');

                return query(args);
            },
        },
    },
});

export default prisma;