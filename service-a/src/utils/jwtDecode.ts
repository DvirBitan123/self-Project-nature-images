import jwt, { JwtPayload } from 'jsonwebtoken';

export const checkAndDecodeToken = (token: string) => {
  try {
    if (process.env.JWT_SECRET) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId: string = (decoded as JwtPayload).id;
      return userId;
    }
  }
  catch (error) {
    console.error(error);
    throw { ...(error as Error), statusCode: 400, message: "invalid token !" };
  }
}