import { Request, Response } from "express";
import groceryModel from "../models/groceryModel";
import { Op } from "sequelize";
import { orderItemsDTO } from "../dtos/user.dto";
import sequelize from "../config/sequelize";
import orderModel from "../models/orderModel";
import { groceryDTO } from "../dtos/shared.dto";
import orderItemsModel from "../models/orderItemsModel";

export const listGroceries = async (req: Request, res: Response) => {
  try {
    const groceries = await groceryModel.findAll({
      where: { quantity: { [Op.gte]: 1 } },
    });
    res.status(200).json({ success: true, groceries });
  } catch (error:any) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const orderGrocery = async (req: Request, res: Response) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const { orderItems }: orderItemsDTO = req.body;

    const itemIds = orderItems.map((item) => item.productId);

    const groceries: groceryDTO[] = await groceryModel.findAll({
      attributes: ["id", "quantity", "price"],
      where: { id: itemIds },
      // lock: true,
      transaction,
    });
    let groceryMap = new Map();
    let totalPrice = 0;

    for (const grocery of groceries) {
      groceryMap.set(grocery.id, grocery.quantity);
      totalPrice += grocery.price;
    }

    const inventoryStatus = orderItems.every((item) => {
      const availableQuantity = groceryMap.get(item.productId) || 0;

      return availableQuantity >= item.quantity;
    });

    if (inventoryStatus) {
      for (const orderItem of orderItems) {
        const productId = orderItem.productId;
        const orderedQuantity = orderItem.quantity;

        await groceryModel.increment(
          { quantity: -orderedQuantity },
          { where: { id: productId } }
        );
      }
      await transaction.commit();
      let totalPrice = groceries.reduce(
        (acc, item: groceryDTO) => acc + (item.price || 0),
        0
      );

      const order = await orderModel.create({ totalPrice: totalPrice });

      const orderedProducts = orderItems.map((item) => ({
        ...item,
        orderId: order.id,
      }));
      await orderItemsModel.bulkCreate(orderedProducts);
      res.status(200).json({ success: true, message: "Order successfull" });
    } else {
      await transaction.rollback();
      res.status(400).json({
        success: false,
        message: "Insufficient inventory for one or more products",
      });
    }
  } catch (error:any) {
    if (transaction) await transaction.rollback();
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
