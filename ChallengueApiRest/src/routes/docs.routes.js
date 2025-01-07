import { Router } from "express"
import { swaggerDocs, } from "../docs/index.js";
import swaggerUi from 'swagger-ui-express';

const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;