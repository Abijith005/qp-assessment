import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

interface orderItemsAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
}

class OrderItemsModel extends Model implements orderItemsAttributes {
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
}

OrderItemsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
  }
);


export default OrderItemsModel