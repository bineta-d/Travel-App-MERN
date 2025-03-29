import mongoose from 'mongoose';
import express from 'express';
import config from './config.js';
import router from './routes/pins.js';
import userRouter from './routes/users.js';

const app = express();
const port = config.PORT || 8800;

app.use(express.json());


mongoose
        .connect(config.MONGO_DBURL)
        .then(()=>{
            console.log( 'App connected to database  ')
        })
        .catch((error)=>{
            console.log(error)

        })


app.use("/api/pins", router);
app.use("/api/users", userRouter);

app.listen(port, ()=>{
         console.log(`App is listening to ${port}`);
         });