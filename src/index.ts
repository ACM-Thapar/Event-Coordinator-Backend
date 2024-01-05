import "dotenv/config";
import "module-alias/register";
import validateEnv from "@utils/validateEnv";
import App from "./app";

import IndexController from "@controllers/index.controller";
import EventController from "@controllers/event/event.controller";

validateEnv();

const app = new App(
  [new IndexController(), new EventController()],
  Number(process.env.PORT!)
);
app.listen();
