import { Request, Response, NextFunction, Router } from "express";

import Controller from "@interfaces/controller.interface";

class IndexController implements Controller {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.index);
  }

  private index = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      response.send("Hello to my awesome dev team!");
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
