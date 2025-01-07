import prisma from '../helpers/prismaClient.js';

export const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, fullName = '' } = req.query;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const filterByFullName = fullName.trim()
            ? {
                fullName: {
                    contains: fullName,
                },
            }
            : {};

        const users = await prisma.user.findMany({
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            omit: {
                password: true,
                createdAt: true,
                updatedAt: true,
            },
            where: filterByFullName
        });

        if (!users.length) return res.status(404).json({ message: 'Users not found' })

        const totalUsers = await prisma.user.count();


        res.json({
            total: totalUsers,
            page: pageNumber,
            limit: limitNumber,
            users: users,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { uid } = req //* uid from requireToken
        // console.log({ uid });

        const user = await prisma.user.findUnique({
            where: {
                id: uid,
            },
            omit: {
                password: true
            }
        })

        if (!user) return res.status(404).json({ message: 'User not found' })

        res.json(user)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const bodyData = req.body
        //* update keys dynamically
        const fieldsAvailable = ['userName', 'name', 'email', 'paternalSurname', 'maternalSurname', 'userType'] // keys available to update
        //* filter body data, to update only available keys
        let dataSended = Object.entries(bodyData);
        let keysFiltered = dataSended.filter(([key, value]) => fieldsAvailable.includes(key));
        let objToUpdate = Object.fromEntries(keysFiltered);

        //check fields available
        if (Object.keys(objToUpdate).length !== 0) {
            const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
            if (!user) return res.status(404).json({ message: 'User to update not found' });

            // Update user
            const updatedUser = await prisma.user.update({
                where: { id: parseInt(id) },
                data: objToUpdate,
                omit: {
                    password: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            res.json(updatedUser);
        } else {
            throw new Error('No valid fields to update');
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);

        const userDeleted = await prisma.user.delete({ where: { id: userId } })
        if (!userDeleted) return res.status(404).json({ message: 'User to delete not found' })
        res.sendStatus(204)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
