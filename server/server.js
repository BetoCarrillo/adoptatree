import express from "express";
import cors from "cors";
import router from "./routes/treesRoute.js";
import usersRoute from "./routes/usersRoute.js";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import treesRoute from "./routes/treesRoute.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5002;

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  app.use(cors(corsOptions));
};

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connection to Mongo DB established in port" + port);
  } catch (error) {
    console.log("error connecting to Mongo DB" + error);
  }
};

const startServer = () => {
  app.listen(port, () => {
    console.log("Server is running on " + port + "port");
  });
};

const loadRoutes = () => {
  app.use("/trees", router);
  app.use("/api/trees", treesRoute);
  app.use("/api/users", usersRoute);
};

(async function controller() {
  await mongoDBConnection();
  addMiddlewares();
  loadRoutes();
  startServer();
})();
