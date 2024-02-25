import { Request, Response } from "express";
import { userLoginDTO, createUserDTO } from "../dtos/user.dto";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwtSign from "../helpers/jwtSign";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: createUserDTO = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const newUserAttributes: Omit<createUserDTO, "id"> = {
      name,
      email,
      password: await bcrypt.hash(password, 10),
    };
    const [user, created] = await userModel.findOrCreate({
      where: { email: email },
      defaults: newUserAttributes,
    });

    if (created) {
      res
        .status(200)
        .json({ successs: true, message: "User registeration successfull" });
    } else {
      res.status(200).json({ success: false, message: "User already exists" });
    }
  } catch (error) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password }: userLoginDTO = req.body;

    const user = await userModel.findOne({ where: { email: email } });
    if (user) {
      const verify = await bcrypt.compare(password, user.password);

      if (verify) {
        const token: string = jwtSign({
          name: user.name,
          email: user.email,
          id: user.id,
          role:"User"
        });
        res.status(200).json({ success: true, message: "Login successfull",authToken:token});
      } else {
        res
          .status(401)
          .json({ success: false, message: "Password not matching" });
      }
    } else {
      res.status(404).json({ success: false, message: "Email not found" });
    }
  } catch (error:any) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
