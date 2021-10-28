import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import MasterPertanyaanService from "../../../../services/elearning/master/master-pertanyaan.service";
import { Container } from "typedi";
import { ObjectId } from "mongoose";

const router = Router();

export default (app: Router) => {
  app.use("/elearning/master/pertanyaan", router);

  const pertanyaanServiceInstance = Container.get(MasterPertanyaanService);

  router.get(
    "/all",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await pertanyaanServiceInstance.GetAllPertanyaan();

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
        namaPertanyaan: Joi.string().required(),
        idSoal: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const pertanyaan = await pertanyaanServiceInstance.TambahPertanyaan(
          req.body
        );

        return res.status(201).json({
          data: pertanyaan,
          message: "Data Master pertanyaan berhasil disimpan",
        });
      } catch (e) {
        next(e);
      }
    }
  );

  router.get("", async (req: Request, res: Response, next: NextFunction) => {
    try {
      let param = {
        namaPertanyaan: req.query.namaPertayaan ? req.query.namaPertayaan : "",
        idSoal: req.query.idSoal ? req.query.idSoal : "",
      };
      const data = await pertanyaanServiceInstance.GetPertanyaanByParams(param);

      return res.status(200).json({
        message: data.length === 0 ? "Data tidak ditemukan" : "Sukses",
        data: data,
      });
    } catch (e) {
      next(e);
    }
  });
};
