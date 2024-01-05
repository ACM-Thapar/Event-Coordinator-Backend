import { cleanEnv, str, port } from "envalid";

const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ["dev", "production"] }),
    MONGO_URI: str(),
    PORT: port(),
  });
};

export default validateEnv;
