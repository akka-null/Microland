import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3050;
const app = express();
import mongoose from "mongoose";

// depends
import compression from "compression";
import cors from "cors";
// import csrfProtection from "csurf";
import helmet from "helmet";
import bodyParser from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";

// routes
import adminRoute from "./routes/adminRoute.js";
import shopRoute from "./routes/shopRoute.js";
import authRoute from "./routes/authRoute.js";

// compression
app.use(compression());
// middlewares
app.use(helmet());
// TODO: read if you should use csrf like this 
// app.use(csrfProtection()); //WARN: in microlan case i do not think will ever need csrf protection 
// TODO: read if you should use cors like this or make our api be consumed only the frontend app
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// using routes
app.use("/admin", adminRoute);
app.use(shopRoute);
app.use(authRoute);

app.get("/", (_req, res) => {
    res.status(200).json({ msg: "hey akka" });
});

mongoose
    .connect(process.env.URI)
    .then((_connection) => {
        app.listen(PORT, () => {
            // console.log(`your app is listenning or port:${PORT}...`);
            console.log(`your app is running on: http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.log(err));
