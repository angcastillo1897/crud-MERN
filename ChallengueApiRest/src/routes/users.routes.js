import { Router } from "express"
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/users.controllers.js"
import { requireToken } from "../middlewares/requireToken.js"

const router = Router();

router.get('/users', requireToken, getUsers)
router.get('/user/', requireToken, getUser)

router.put('/users/:id', requireToken, updateUser)
router.delete('/users/:id', requireToken, deleteUser)

export default router;