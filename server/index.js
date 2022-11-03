import express from "express";
import cors from "cors";
import router from "./routes/treesRoute.js";
import usersRoute from "./routes/usersRoute.js";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import treesRoute from "./routes/treesRoute.js";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import passport from "passport";
import passportConfig from "./config/passportConfig.js";

const app = express();
const port = process.env.PORT || 5005;

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  const allowedOrigins = [
    "https://adoptatree.vercel.app",
    "http://localhost:3000",
  ];

  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

  app.use(cors(corsOptions));
  cloudinaryConfig();
  app.use(passport.initialize());
  passportConfig(passport);
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
