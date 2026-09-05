import { Router, type IRouter } from "express";
import healthRouter from "./health";
import tkaTryoutRouter from "./tkaTryout";

const router: IRouter = Router();

router.use(healthRouter);
router.use(tkaTryoutRouter);

export default router;
