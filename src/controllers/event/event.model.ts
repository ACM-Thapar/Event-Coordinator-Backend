import mongoose from "mongoose";
import Event from "./event.interface";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  organizer: String,
});

const eventModel = mongoose.model<Event & mongoose.Document>(
  "Event",
  eventSchema
);

export default eventModel;
