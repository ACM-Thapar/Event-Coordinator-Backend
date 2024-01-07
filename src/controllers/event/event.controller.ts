import { Router, Request, Response, NextFunction } from "express";
import eventModel from "./event.model";
import Controller from "@interfaces/controller.interface";
import { EventNotFoundException } from "@utils/exceptions/application.exception";
import { title } from "process";

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
      type ObjectKey = keyof typeof eventData;
      // Simple Check if Title is not Present.(till users are not there)
      if(!eventData['title' as ObjectKey,'description' as ObjectKey]){
        return response.status(400).json({
          success:false,
          message:"Missing Fields"
        })
      }
      const createdEvent = await this.event.create(eventData);
      response.send(createdEvent);
    } catch (error) {
      return  response.status(400).json({success: false,message:"Error in creating Event."})
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
      if(!successResponse){
        return response.status(400).json({
          status:"400",
          message:"Event Not Found"
        }) 
      }
      response.send(successResponse);
    } catch (error) {
      return response.status(400).json({
        status:"false",
        message:"Unable to Delete the Event"
      })
      //next(error);
    }
  };
}

export default EventController;
