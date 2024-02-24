import express, { Request, Response } from "express";
import morgan from "morgan";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", (req: Request, res: Response) => {
  res.send("hello app runnig");
});

app.listen(port, () => {
  console.log(`server runnig in port ${port}`);
});
