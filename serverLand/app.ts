import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// depends
import compression from "compression";
import cors from "cors";
// import csrfProtection from "csurf";
import helmet from "helmet";
import { urlencoded, json } from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";

// routes
import adminRoute from "./routes/adminRoute";
import shopRoute from "./routes/shopRoute";
import authRoute from "./routes/authRoute";

dotenv.config();
const PORT = process.env.PORT! || 3050;
const app = express();

// compression
app.use(compression());
// middlewares
app.use(helmet());
// TODO: *read if you should use csrf like this 
// app.use(csrfProtection()); //WARN: * user CSRF if you use stripe or chargily
// TODO: * read if you should use cors like this or make our api be consumed only the frontend app
//       * learn more about cors
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cors({ credentials: true }));
app.use(logger("dev"));
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());

// using routes
app.use("/admin", adminRoute);
app.use(shopRoute);
app.use(authRoute);

app.get("/", (_req, res) => {
    res.status(200).json({ msg: "hey akka" });
});

mongoose
    .connect(process.env.URI!)
    .then((_connection) => {
        app.listen(PORT, () => {
            // console.log(`your app is listenning or port:${PORT}...`);
            console.log(`your app is running on: http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.log(err));
