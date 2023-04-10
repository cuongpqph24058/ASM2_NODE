import express from 'express';
import {get,getAll,create,update,remove} from '../controllers/category'
import { checkPermission } from '../middlewares/checkPromission';

const router = express.Router();

router.get("/category",getAll)
router.post("/category",create)
router.put("/category/:id",checkPermission,update)
router.get("/category/:id",checkPermission,get)
router.delete("/category/:id",checkPermission,remove)

export default router