import express from "express"
import { test } from "../controllers/userServiceController"

const router=express.Router()

router.get('/any',test)

export default router