import { NextFunction, Request, Response } from "express";
import jwtVerify from "../helpers/jwtVerify";

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('it is comig antiehrkjhd,==============');
    
    const token = req.headers.authorization!.split(" ")[1];

    const verify = jwtVerify(token);

    if (verify && verify.role === "User") {
      next();
    } else {
      throw Error;
    }
  } catch (error) {
    console.log(`err \n ${error}`);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default userAuth;
