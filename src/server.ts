import express from "express";
import morgan from "morgan";
import "dotenv/config";
import sequelize from "./config/sequelize";
import adminAuthRouter from "./routes/adminAuthRoutes"
import userAuthRouter from "./routes/userAuthRoutes"
import userServiceRouter from"./routes/userServiceRoutes"
import { authFunction } from "./midddelwares/authMiddleware";

const app = express();
const port = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing the database:", err);
  });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/admin/auth',adminAuthRouter)
app.use('/api/v1/user/auth',userAuthRouter)
app.use('/api/v1/user',authFunction,userServiceRouter)

app.listen(port, () => {
  console.log(`server runnig in port ${port}`);
});
