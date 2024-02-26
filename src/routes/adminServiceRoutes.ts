import express from 'express'
import { addGroceryItem, getGroceryItems, manageInventory, removeItem, updateItem } from '../controllers/adminServiceController'

const router=express.Router()

router.post('/addGrocery',addGroceryItem)

router.get('/viewGroceries',getGroceryItems)

router.delete('/removeGrocery/:id',removeItem)

router.put('/updateGrocery/:id',updateItem)

router.patch('/manageInventory/:id',manageInventory)

export default router