import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwtVerify from "../helper/jwtVerify";

export const authFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    console.log(token);
    
    const verify = jwtVerify(token);
    if (verify) {
      next();
    }
  } catch (error) {
    console.log(`err \n ${error}`);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
