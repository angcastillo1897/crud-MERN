/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication management
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               paternalSurname:
 *                 type: string
 *                 required: false
 *               maternalSurname:
 *                 type: string
 *                 required: false
 *               password:
 *                 type: string
 *               userType:
 *                 type: string
 *                 enum: [ADMIN, USER]
 *     responses:
 *       200:
 *         description: User registered successfully, return info of token
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE2LCJpYXQiOjE3MzU5NjM4NDksImV4cCI6MTczODk0NDY0OX0.cvOnEtJ4JQjzDGcAuAD2V79lYFjDlM18a773WCh0sow; Path=/; Expires=Fri, 07 Feb 2025 16:10:49 GMT; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: token of user created.
 *                 expiresIn:
 *                   type: string
 *                   description: expiration date of token.
 *       400:
 *         description: Bad request - All fields are required, User already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully, and return info of token
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE2LCJpYXQiOjE3MzU5NjM4NDksImV4cCI6MTczODk0NDY0OX0.cvOnEtJ4JQjzDGcAuAD2V79lYFjDlM18a773WCh0sow; Path=/; Expires=Fri, 07 Feb 2025 16:10:49 GMT; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: token of user created.
 *                 expiresIn:
 *                   type: string
 *                   description: expiration date of token.
 *       401:
 *         description: Unauthorized , Credentials incorrect
 */

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Refresh authentication token
 *     description: Get a new token using the refresh token, sending by cookies.
 *     tags: [Authentication]
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *         required: true
 *         description: Refresh token
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE2LCJpYXQiOjE3MzU5NjM4NDksImV4cCI6MTczODk0NDY0OX0.cvOnEtJ4JQjzDGcAuAD2V79lYFjDlM18a773WCh0sow
 *     responses:
 *       200:
 *         description: got new Token successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: token of user created.
 *                 expiresIn:
 *                   type: string
 *                   description: expiration date of token.
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout a user and clear the refresh token saved in cookie
 *     tags: [Authentication]
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *         required: true
 *         description: Refresh token
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE2LCJpYXQiOjE3MzU5NjM4NDksImV4cCI6MTczODk0NDY0OX0.cvOnEtJ4JQjzDGcAuAD2V79lYFjDlM18a773WCh0sow
 *     responses:
 *       204:
 *         description: User logged out successfully
 */