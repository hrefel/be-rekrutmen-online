import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import LowonganService from "../../../services/central-apps/lowongan.service";
import { Container } from "typedi";
import middlewares from '../../middlewares';

const router = Router();

export default (app: Router) => {
  app.use("/central-app/lowongan", router);

  const LowonganServiceInstance = Container.get(LowonganService);

  router.get("", middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await LowonganServiceInstance.GetLowongan(req.query);

      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  });

  router.post(
    "",
    celebrate({
      body: Joi.object({
        judulLowongan: Joi.string().required(),
        lowonganKadaluarsa: Joi.date().required(),
        maxPeserta: Joi.number(),
        deskripsi: Joi.string(),
        kategori: Joi.string(),
        jenjangPendidikan: Joi.string(),
        tglTerbit: Joi.date()
      }),
    }), middlewares.isAuth, middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const soal = await LowonganServiceInstance.TambahLowongan(req.body);

        return res.status(201).json({
          data: soal,
          message: "Data Master kategori berhasil disimpan",
        });
      } catch (e) {
        next(e);
      }
    }
  );
};
