import express from 'express'
import { addGroceryItem, getGroceryItems, manageInventory, removeItem, updateItem } from '../controllers/adminServiceController'

const router=express.Router()

router.post('/add/grocery',addGroceryItem)

router.get('/viewGroceries',getGroceryItems)

router.delete('/removeItem/:id',removeItem)

router.put('/updateItem/:id',updateItem)

router.patch('/manageInventory/:id',manageInventory)

export default router