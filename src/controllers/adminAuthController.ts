import { Request, Response } from "express";
import AdminModel from "../models/adminModel";
import { loginDTO } from "../dtos/admin.dto";
import bcrypt from "bcrypt";
import jwtSign from "../helpers/jwtSign";

export const login = async (req: Request, res: Response) => {
  try {    
    const { email, password }: loginDTO = req.body;
    const admin = await AdminModel.findOne({ where: { email: email } });
    if (admin) {
      const verify: boolean = await bcrypt.compare(password, admin.password);
      if (verify) {
        const token=jwtSign({email:admin.email,role:"Admin"})
        res.status(200).json({ success: true, message: "login successfull",authToken:token });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Password not matching" });
      }
    } else {
      res.status(404).json({ succss: false, message: "Email not found" });
    }
  } catch (error:any) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
