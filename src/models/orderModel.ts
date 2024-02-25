import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

interface orderAttributes {
  id: number;
  totalPrice: number;
}

class OrderModel extends Model implements orderAttributes {
  public id!: number;
  public totalPrice!: number;
}


OrderModel.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    totalPrice:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
},{
    sequelize,
    modelName:"Order"
})

export default OrderModel