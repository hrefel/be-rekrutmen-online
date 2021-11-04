import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import LowonganService from "../../../services/web/lowongan.service";
import { Container } from "typedi";

const router = Router();

export default (app: Router) => {
  app.use("/web/lowongan", router);

  const LowonganServiceInstance = Container.get(LowonganService);

  router.get("", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await LowonganServiceInstance.GetLowongan(req.query);

      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  });

  
};
