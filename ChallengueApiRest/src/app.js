import express from "express";
import morgan from "morgan";

import 'dotenv/config'

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
//*routes imports
import users from "./routes/users.routes.js";
import authentication from "./routes/authentication.routes.js";
import docs from "./routes/docs.routes.js";

const app = express();

//settings
app.set("appName", "Grow Analytics API");
app.set("case sensitive routing", true);

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(compression());

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Allow your frontend's origin
    credentials: true, // Enable credentials
};
app.use(cors(corsOptions));
// routes
app.use('/api', users);
app.use('/api', authentication);
app.use('/api', docs);
app.get('/api', (req, res) => res.json('My API Rest running !!! 😇😇⚽ '));

export default app;