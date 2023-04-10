import express from 'express';
import {get,getAll,create,update,remove} from '../controllers/product'

const router = express.Router();

router.get("/products",getAll)
router.post("/products",create)
router.put("/products/:id",update)
router.get("/products/:id",get)
router.delete("/products/:id",remove)

export default router