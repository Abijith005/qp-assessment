import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

interface groceryAttributes {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

class GroceryModel extends Model<groceryAttributes> implements groceryAttributes
{
  public id!: number;
  public name!: string;
  public price!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GroceryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName:'Groceries',
  }
);

export default GroceryModel
