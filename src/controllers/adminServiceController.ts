import { Request, Response } from "express";
import groceryModel from "../models/groceryModel";
import { groceryDTO } from "../dtos/shared.dto";

export const addGroceryItem = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity }: Omit<groceryDTO, "id"> = req.body;
    await groceryModel.create({ name, price, quantity });
    res
      .status(200)
      .json({ success: true, message: "Grocery added successfully" });
  } catch (error:any) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getGroceryItems = async (req: Request, res: Response) => {
  try {
    const groceries = await groceryModel.findAll();
    res.status(200).json({ success: true, groceries });
  } catch (error:any) {
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
  } catch (error:any) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const { name, price, quantity }: Omit<groceryDTO, "id"> = req.body;
    const updateData: any = {};
    if (name) updateData.name = name;

    if (price) updateData.price = price;

    if (quantity) updateData.quantity = quantity;

    if (Object.keys(updateData).length == 0) {
      res
        .status(400)
        .json({ success: false, message: "No update data available" });
    }

    const [updatedRowsCount] = await groceryModel.update(updateData, {
      where: { id: itemId },
    });
    if (updatedRowsCount) {
      res.status(200).json({ success: true, message: "Grocery item updated" });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (error:any) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const manageInventory = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;

    const { quantity }: { quantity: number } = req.body;
    if (!quantity) {
      res
        .status(400)
        .json({ success: false, message: "Quantity not available" });
    }

    const [updatedRowsCount] = await groceryModel.increment("quantity", {
      by: quantity,
      where: { id: itemId },
    });
    if (updatedRowsCount) {
      res
        .status(200)
        .json({ success: true, message: "Inventory updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (error:any) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
