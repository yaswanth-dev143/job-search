//const express=require('express');
//package imports
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
//files imports
import connectDB from "./config/db.mjs";
//routes import
import testroutes from './routes/testroutes.mjs';
import authroutes from './routes/authroutes.mjs';
import errormiddleware from './middlewares/errormiddleware.js';
import userRoutes from './routes/userRoutes.js';
import detect from 'detect-port';
dotenv.config();
//mongodb connection
connectDB();
//rest object
const app = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
//routes
app.use('/api/v1/test', testroutes);
app.use('/api/v1/auth', authroutes);
app.use('/api/v1/user', userRoutes);

//validation middleware
app.use(errormiddleware);
//port
const PORT = process.env.PORT || 4002;
//listen
app.listen(PORT, () => {
    console.log(`node server running in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan.white);
});
