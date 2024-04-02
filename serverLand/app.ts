// FIX: - check bearer token and should you use it or if your aproach with httponly cookie is the right call or even if your doing it the right way
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// TODO: must
//          * order (cart system chekcout)
//          * forum for algeria
//          * chagily for algeria
//          * stripe for real world
//          # password recovery
//          # OAuth with google
//          # max try jail
//          ## check the code all the fields sschema 
//          ### to get hired
//          # must create a documentaiton for the backend(api doc)
//          # writing tests ( for now we are using postman as testing)
//
// depends
// FIX: change all the error handling mechanisem 
import compression from "compression";
import cors from "cors";
// import csrfProtection from "csurf";
import helmet from "helmet";
import { urlencoded, json } from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";

// routes
import adminRoute from "./routes/adminRoute";
import userRoute from "./routes/userRoute";
import shopRoute from "./routes/shopRoute";
import authRoute from "./routes/authRoute";
import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorhandler";

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
app.get("/", (req, res, _next) => {
    res.status(200).json({ msg: "hey akka", "@": `${req.hostname}` });
});

app.use("/api", adminRoute);
app.use("/api", userRoute);
app.use("/api", shopRoute);
app.use("/api", authRoute);
app.use(notFound);
app.use(errorHandler);

mongoose
    .connect(process.env.URI!)
    .then((_connection) => {
        app.listen(PORT, () => {
            // console.log(`your app is listenning or port:${PORT}...`);
            console.log(`your app is running on: http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.log(err));
