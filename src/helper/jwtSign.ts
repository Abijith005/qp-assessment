import jwt from "jsonwebtoken";
import { userPayloadDTO } from "../dtos/user.dto";

const jwtSign = (payload:userPayloadDTO) => {
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