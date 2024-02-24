import express from 'express'
import { addGroceryItem, getGroceryItems, removeItem } from '../controllers/adminServiceController'

const router=express.Router()

router.post('/add/grocery',addGroceryItem)

router.get('/viewGroceries',getGroceryItems)

router.delete('/removeItem/:id',removeItem)

export default router