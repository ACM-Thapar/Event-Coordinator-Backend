interface Event {
  title: string;
  description: string;
  organizer: string;
  register_link:string,
  event_start:Date,
  event_end:Date,
  event_link:string,
  location:string,
  tags:Array<string>,
  phone:string,
  email:string,
  discord_link:string,
  doc_link:string,
  instagram_link:string
}

export default Event;
