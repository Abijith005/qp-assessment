import express from "express"
import { listGroceries, orderGrocery } from "../controllers/userServiceController"

const router=express.Router()

router.get('/listGroceries',listGroceries)

router.post('/orderGroceries',orderGrocery)


export default router