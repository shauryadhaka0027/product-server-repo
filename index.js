import express from 'express';
import dotenv from "dotenv"
import connection from './config/db.js';
import userRouter from "./routes/user.js"
import productRouter from "./routes/product.js"
import cors from 'cors';
import cookieParser from "cookie-parser"

dotenv.config(); 

const port = process.env.PORT || 3000; 

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin:"https://product-client-repo.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
}));

app.use("/",userRouter);
app.use("/",productRouter);

app.listen(port,async(req,res)=>{
    await connection
    console.log(`Server is running on port ${port}`);
});