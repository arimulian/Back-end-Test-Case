import express from "express";
import route from "../route/routes.js";
import { errorHandler } from "../middleware/error.js";

export const web = express();
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(route);
web.use(errorHandler);
