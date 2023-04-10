import  express from  'express';
import mongoose from 'mongoose';
import categoryRouter from './routers/category' 
import productRouter from './routers/product'
import userRouter from './routers/auth'
const app = express();

// app.use(cors())

app.use(express.json())
app.use("/api",categoryRouter)
app.use("/api",productRouter)
app.use("/api",userRouter)
mongoose.connect("mongodb://127.0.0.1:27017/thuxongxoa")

export const viteNodeApp = app 