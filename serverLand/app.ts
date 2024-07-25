import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerDocs from "./utils/swagger";

// TODO: must
//          * chagily for algeria
//          # OAuth with google
//          # max try jail
//          # must create a documentaiton for the backend(api doc)
//          # writing tests ( for now we are using postman as testing)

// depends
import compression from "compression";
import cors from "cors";
// import csrfProtection from "csurf";
import helmet from "helmet";
import { urlencoded, json, raw } from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";

// routes
import adminRoute from "./routes/adminRoute";
import userRoute from "./routes/userRoute";
import shopRoute from "./routes/shopRoute";
import authRoute from "./routes/authRoute";
import notFound from "./middlewares/notFound";
import { stripeFulfillOrder } from "./controllers/shopController";
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
app.use(cors({ origin: '*', credentials: true }));
// app.use(cors({ credentials: true }));
// app.use(cors());
app.use(logger("dev"));

// NOTE: stripe fulfill the order
//      - must be before we parse the request to json or any other type
app.use("/api/orders/stripe/fulfill", raw({ type: 'application/json' }), stripeFulfillOrder);

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());

// using routes
app.get("/", (req, res, _next) => {
    res.status(200).json({ msg: "hey akka", "@": `${req.hostname}` });
});

swaggerDocs(app, PORT);
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
            console.log(`your app is listenning on http://localhost:${PORT}...`);
        });
    })
    .catch((err) => console.log(err));
