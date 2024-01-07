import mongoose from "mongoose";
import Event from "./event.interface";

const eventSchema = new mongoose.Schema({
  title:{type:String,require:true},
  description: String,
  organizer: String,
  register_link:String,
  event_start:Date,
  event_end:Date,
  event_link:String,
  location:String,
  tags:[String],
  phone:String,
  email:String,
  discord_link:String,
  doc_link:String,
  instagram_link:String,
});

const eventModel = mongoose.model<Event & mongoose.Document>(
  "Event",
  eventSchema
);

export default eventModel;
