import { Router, Request, Response, NextFunction } from "express";
import eventModel from "./event.model";
import Controller from "@interfaces/controller.interface";
import { EventNotFoundException } from "@utils/exceptions/application.exception";

class EventController implements Controller {
  public path = "/event";
  public router = Router();
  private event = eventModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllEvents);
    this.router.post(this.path, this.createEvent);
    this.router.put(`${this.path}/:id`, this.updateEvent);
    this.router.delete(`${this.path}/:id`, this.deleteEvent);
  }

  private getAllEvents = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const events = await this.event.find();
      response.send(events);
    } catch (error) {
      next(error);
    }
  };

  private createEvent = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const eventData: Event = request.body;
      const createdEvent = new this.event(eventData);
      const savedEvent = await createdEvent.save();
      response.send(savedEvent);
    } catch (error) {
      next(error);
    }
  };

  private updateEvent = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const eventData: Event = request.body;
      const updatedEvent = await this.event.findByIdAndUpdate(id, eventData, {
        new: true,
      });
      response.send(updatedEvent);
    } catch (error) {
      next(new EventNotFoundException(request.params.id));
    }
  };

  private deleteEvent = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const successResponse = await this.event.findByIdAndDelete(id);
      response.send(successResponse);
    } catch (error) {
      next(error);
    }
  };
}

export default EventController;
