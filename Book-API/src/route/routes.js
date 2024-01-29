import { Router } from "express";
import memberController from "../controller/memberController.js";
import bookController from "../controller/bookController.js";
import borrowController from "../controller/borrowController.js";

const route = Router();

route.post("/api/member", memberController.create);
route.get("/api/member", memberController.getMember);

route.post("/api/book", bookController.create);
route.get("/api/book", bookController.getBooks);

route.post("/api/borrow", borrowController.create);
route.post("/api/borrow/returned", borrowController.returned);
export default route;
