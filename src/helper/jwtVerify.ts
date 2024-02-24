import jwt from "jsonwebtoken"

const jwtVerify = (token:string) => {
    try {
      return jwt.verify(token, process.env.JWT_SIGNATURE!);
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  };
  
  export default jwtVerify;
  