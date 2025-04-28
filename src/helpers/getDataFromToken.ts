import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface TokenPayload {
  id: string;  // Define your token fields here (id, email, etc.)
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenPayload;
    return decodedToken.id; 
  } catch (error: any) {
    throw new Error(error.message);
  }
};
