import { hashPassword, isMatch, generateToken, generateRefreshToken } from "../helpers/tokenMethods.js";
import prisma from '../helpers/prismaClient.js';

export const register = async (req, res) => {
    try {
        const { userName, email, name, paternalSurname = '', maternalSurname = '', password, userType } = req.body

        if (!userName || !email || !name || !password || !userType) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const newUser = await prisma.user.create({
            data: {
                userName,
                email,
                name,
                paternalSurname,
                maternalSurname,
                password: hashPassword(password),
                userType
            },
        })

        //*generate JWT
        const { token, expiresIn } = generateToken({ uid: newUser.id })
        generateRefreshToken({ uid: newUser.id }, res)

        return res.status(200).json({ token, expiresIn })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return res.status(400).json({ message: 'Credentials incorrect' })
        }

        if (!isMatch(password, user.password)) {
            return res.status(400).json({ message: 'Credentials incorrect' })
        }

        //*generate JWT
        const { token, expiresIn } = generateToken({ uid: user.id })
        generateRefreshToken({ uid: user.id }, res) //* essential to refresh the principal token

        return res.json({ token, expiresIn })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const logout = async (req, res) => {
    res.clearCookie('refreshToken');

    return res.sendStatus(204);
}

export const refreshToken = async (req, res) => {

    try {
        const { uid } = req //* uid from requireRefreshToken

        const { token, expiresIn } = generateToken({ uid }) //generate new token

        return res.json({ token, expiresIn })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}