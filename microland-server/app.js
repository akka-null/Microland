import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3050;
const app = express();
import mongoose from 'mongoose';

// depends
import helmet from 'helmet';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

// routes
import adminRoute from './routes/adminRoute.js';
import shopRoute from './routes/shopRoute.js';
import authRoute from './routes/authRoute.js';

// middlewares
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// using routes
app.use('/admin', adminRoute);
app.use(shopRoute);
app.use(authRoute);

app.get('/', (req, res) => {
    res.status(200).json({ msg: "hey akka" });
});

mongoose.connect(process.env.URI)
    .then(_connection => {
        app.listen(PORT, () => {
            console.log(`your app is listenning or port:${PORT}...`);
        });
    })
    .catch(err => console.log(err)); 
