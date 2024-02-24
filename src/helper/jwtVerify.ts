import jwt from "jsonwebtoken";
import { payloadDTO } from "../dtos/shared.dto";

const jwtVerify = (token: string): payloadDTO => {
  try {
    return jwt.verify(token, process.env.JWT_SIGNATURE!) as payloadDTO;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export default jwtVerify;
