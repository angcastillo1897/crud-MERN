import { Router } from "express"
import { register, login, refreshToken, logout } from "../controllers/authentication.controllers.js"
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js"
const router = Router();

router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/auth/refresh', requireRefreshToken, refreshToken)
router.get('/auth/logout', requireRefreshToken, logout)

export default router;