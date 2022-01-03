import mongoose from 'mongoose';
import express from 'express';

import dotenv from 'dotenv-defaults'
// import http, express, doting, mongoose, WebSocket... etc.
export default  () => {
    dotenv.config();
    mongoose.connect(
        process.env.MONGO_URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    )
    const db = mongoose.connection
    db.once('open', () => {
        console.log('Mongo DB connected!');
        })
    return db;
}
 