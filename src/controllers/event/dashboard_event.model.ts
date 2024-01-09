import mongoose from "mongoose";
import Dashboard_Event from "./dashboard_event.interface";

const eventTopSchema = new mongoose.Schema({
    title:String,
    organiser:String,
    event_start:Date,
    event_end:Date,
    event_vanue:String,
    event_time:TimeRanges,
    page_link:String
});

const dashboard_eventModel = mongoose.model<Event & mongoose.Document>(
  "Dashboard_Event",
  eventTopSchema
);

export default dashboard_eventModel;
