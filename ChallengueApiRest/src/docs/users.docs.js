/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: The number of page
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: The numbers of items per page
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: The token for the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total users in db.
 *                 page:
 *                   type: integer
 *                   description: Current page.
 *                 limit:
 *                   type: integer
 *                   description: The numbers of items per page.
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                       userName:
 *                         type: string
 *                         description: The userName.
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                       email:
 *                         type: string
 *                         description: The user's email address.
 *                       paternalSurname:
 *                         type: string
 *                         description: The paternal Surname.
 *                       maternalSurname:
 *                         type: string
 *                         description: The maternal Surname.
 *                       userType:
 *                         type: string
 *                         description: The user type ,could be 'USER' OR 'ADMIN'. 
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the user was created.
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the user was last updated.
 *       400:
 *         description: Bad request
 *       404:
 *         description: Users not found
 */

/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Retrieve a single user, is required a token
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: The token for the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                 userName:
 *                   type: string
 *                   description: The userName.
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                 paternalSurname:
 *                   type: string
 *                   description: The paternal Surname.
 *                 maternalSurname:
 *                   type: string
 *                   description: The maternal Surname.
 *                 userType:
 *                   type: string
 *                   description: The user type, could be 'USER' OR 'ADMIN'.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the user was created.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the user was last updated.
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: The token for the user
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 *       400:
 *         description: Bad request
 *       404:
 *        description:  User to delete not found
 */
