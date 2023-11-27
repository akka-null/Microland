import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3050;
const app = express();

import mongoose from 'mongoose';
import User from './models/userModel.js';
// routes
import adminRoute from './routes/adminRoute.js';
import shopRoute from './routes/shopRoute.js';
import authRoute from './routes/authRoute.js';

// depends
import helmet from 'helmet';
import bodyParser from 'body-parser';
import logger from 'morgan';

// middlewares
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
