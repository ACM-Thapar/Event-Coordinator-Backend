import { Router, Request, Response, NextFunction } from "express";
import dashboard_eventModel from "./dashboard_event.model";
import Controller from "@interfaces/controller.interface";
import { EventNotFoundException } from "@utils/exceptions/application.exception";

class DashboardEventController implements Controller {
  public path = "/event/top";
  public router = Router();
  private event = dashboard_eventModel;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllDashboardEvents);
  }

  private getAllDashboardEvents = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const dashboard_events = await this.event.find();
      response.send(dashboard_events);
    } catch (error) {
        return response.status(400).json({
            status:"400",
            message:"Unable to Fetch the Dahboard Events"
        })
    }
  };
}

export default DashboardEventController;
