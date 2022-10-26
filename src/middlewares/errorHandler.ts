import { Prisma } from "@prisma/client";
import e, { Response, Request, NextFunction } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if(error instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      statusCode: 400,
      message: `${error.message.split("Argument ")[1]}`
    });
  }
  
  if(error && error.statusCode) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message
    });
  }

  console.log(error);
};