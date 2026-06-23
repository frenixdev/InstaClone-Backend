import { Router } from "express";
import * as controller from "./feed.controller";
import * as response from "./feed.response"
import { verifyTokenHandler } from "@/middlewares";

export const feedRoutes = Router();
feedRoutes.get("/", verifyTokenHandler,  controller.getFeedController, response.getFeedResponse)


