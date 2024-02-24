import { Sequelize } from "sequelize";

const database = process.env.DB_NAME!;
const username = process.env.DB_USERNAME!;
const password = process.env.DB_PASSWORD!;

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
