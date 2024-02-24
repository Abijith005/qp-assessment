import jwt from "jsonwebtoken";
import { payloadDTO } from "../dtos/shared.dto";

const jwtSign = (payload:payloadDTO) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SIGNATURE!, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export default jwtSign;