import { Request, Response } from "express";
import { groceryDTO } from "../dtos/admin.dto";
import groceryModel from "../models/groceryModel";

export const addGroceryItem = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity }: groceryDTO = req.body;
    await groceryModel.create({ name, price, quantity });
    res
      .status(200)
      .json({ success: true, message: "Grocery added successfully" });
  } catch (error) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getGroceryItems = async (req: Request, res: Response) => {
  try {
    const groceries = await groceryModel.findAll();
    res.status(200).json({ success: true, groceries });
  } catch (error) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const removeItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const deletedItems = await groceryModel.destroy({ where: { id: itemId } });
    console.log(deletedItems);

    if (!deletedItems) {
      res.status(404).json({ success: false, message: "Item not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Item removed successfully" });
    }
  } catch (error) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
