import { Request, Response, NextFunction } from "express";
import HttpException from "@utils/exceptions/http.exception";

function ErrorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || "Something went wrong. Please try again.";
  response.status(status).send({
    status,
    message,
  });
}
export default ErrorMiddleware;
