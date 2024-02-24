import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize'; 

interface AdminAttributes {
  id: number;
  email: string;
  password: string;
}

class AdminModel extends Model<AdminAttributes> implements AdminAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AdminModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
  }
);

export default AdminModel;
