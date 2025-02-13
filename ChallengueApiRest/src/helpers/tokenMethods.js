import bcrypt from 'bcrypt';
import 'dotenv/config'
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

export const hashPassword = (password) => {
    return bcrypt.hashSync(password, SALT_ROUNDS);
}

export const isMatch = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

export const generateToken = (payload) => {
    const expiresIn = '15m';
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
        return {
            token,
            expiresIn
        }
    } catch (error) {
        console.error(error);
    }
}

export const generateRefreshToken = (payload, res) => {
    const expiresIn = '30d'; // 30 days ,because is refresh token
    const expiresInMilliseconds = 60 * 60 * 24 * 30 * 1000;
    try {
        // send by cookie the refresh token, and saved in every request
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn });
        // set cookies refreshToken
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, //* secure is true when we are working with https
            expires: new Date(Date.now() + expiresInMilliseconds), //* expires
        });

        return {
            refreshToken,
            expires: expiresIn
        }
    } catch (error) {
        console.error(error);
    }
}

// export const corsCallback = () => {
//     if (process.env.MODE === 'developer') {
//         return function (origin, callback) {
//             if (!origin) { //* because in same dominio, the origin is undefined
//                 return callback(null, true);
//             }
//             return callback(new Error('ERROR by CORS:' + origin + " Not allowed"));
//         }
//     } else {
//         const whiteList = [process.env.ORIGIN1]
//         return function (origin, callback) {
//             if (whiteList.includes(origin)) {
//                 return callback(null, true);
//             }
//             return callback(new Error('ERROR by CORS:' + origin + " Not allowed"));
//         }
//     }
// }