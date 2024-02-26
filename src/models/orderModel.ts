import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

interface orderAttributes {
  id: number;
  userId: number;
  totalPrice: number;
}

class OrderModel extends Model implements orderAttributes {
  public id!: number;
  public userId!: number;
  public totalPrice!: number;
}

OrderModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Order",
  }
);

export default OrderModel;
