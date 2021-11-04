import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import MasterKategoriService from "../../../services/master/master-kategori.service";
import { Container } from "typedi";

const router = Router();

export default (app: Router) => {
  app.use("/master/kategori", router);

  const masterKategoriServiceInstance = Container.get(MasterKategoriService);

  router.get(
    "",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await masterKategoriServiceInstance.GetAllKategori();

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
        namaKategori: Joi.string().required(),
        type: Joi.number(),
        statusEnabled: Joi.boolean()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const soal = await masterKategoriServiceInstance.TambahKategori(req.body);

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
