import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import MasterJenjangPendidikanService from "../../../services/master/master-jenjang-pendidikan.service";
import { Container } from "typedi";

const router = Router();

export default (app: Router) => {
  app.use("/master/jenjang-pendidikan", router);

  const masterJenjangPendidikanServiceInstance = Container.get(MasterJenjangPendidikanService);

  router.get(
    "",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await masterJenjangPendidikanServiceInstance.GetAllJenjangPendidikan();

        return res.status(200).json(data);
      } catch (e) {
        next(e);
      }
    }
  );

  router.post(
    "",
    celebrate({
      body: Joi.object({
        namaPendidikan: Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const soal = await masterJenjangPendidikanServiceInstance.TambahJenjangPendidikan(req.body);

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
