import { Request, Response } from "express";
import AdminModel from "../models/adminModel";
import { loginDTO } from "../dtos/admin.dto";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: loginDTO = req.body;
    const admin = await AdminModel.findOne({ where: { email: email } });
    if (admin) {
      const verify: boolean = await bcrypt.compare(password, admin.password);
      if (verify) {
        
        res.status(200).json({ success: true, message: "login successfull" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Password not matching" });
      }
    } else {
      res.status(404).json({ succss: false, message: "Email not found" });
    }
  } catch (error) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};