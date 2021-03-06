import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import MasterSoalService from "../../../../services/elearning/master/master-soal.service";
import { Container } from "typedi";

const router = Router();

export default (app: Router) => {
  app.use("/elearning/master/soal", router);

  const soalServiceInstance = Container.get(MasterSoalService);

  router.get(
    "/all",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await soalServiceInstance.GetAllSoal();

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
        namaSoal: Joi.string().required(),
        waktuPengerjaan: Joi.number().required(),
        createdBy: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const soal = await soalServiceInstance.TambahSoal(req.body);

        return res.status(201).json({
          data: soal,
          message: "Data Master soal berhasil disimpan",
        });
      } catch (e) {
        next(e);
      }
    }
  );

  router.get(
    "",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { idSoal, namaSoal, waktuPengerjaan, createdBy } = req.query;
        let param: any = { };
        
        if (idSoal) param._id = idSoal;
        if (namaSoal) param.namaSoal = new RegExp(namaSoal, "i");
        if (waktuPengerjaan) param.waktuPengerjaan = parseInt(waktuPengerjaan);
        if (createdBy) param.createdBy = new RegExp(createdBy, "i");
        param.statusEnabled = true;
        const data = await soalServiceInstance.GetSoalByParams(param);

        return res.status(200).json(data);
      } catch (e) {
        next(e);
      }
    }
  );

  router.post(
    "/delete",
    celebrate({
      body: Joi.object({
        id: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = {
          _id: req.body.id,
          statusEnabled: false,
        };
        const result = await soalServiceInstance.DeleteData(data);

        return res.status(201).json({
          message: "Data Berhasil di Ubah",
        });
      } catch (e) {
        next(e);
      }
    }
  );
  router.post(
    "/edit",
    celebrate({
      body: Joi.object({
        id: Joi.string(),
        namaSoal: Joi.string()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = {
          _id: req.body.id,
          namaSoal: req.body.namaSoal
        };
        const result = await soalServiceInstance.EditSoal(data);

        return res.status(201).json({
          message: "Data Berhasil di Ubah",
        });
      } catch (e) {
        next(e);
      }
    }
  );
};
