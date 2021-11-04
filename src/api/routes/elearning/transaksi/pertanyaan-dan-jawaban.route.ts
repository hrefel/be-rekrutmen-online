import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";

import PertanyaanDanJawabanService from "../../../../services/elearning/transaksi/pertanyaan-dan-jawaban.service";
import MasterPertanyaanGroupService from "../../../../services/elearning/master/master-pertanyaan-group.service";

const router = Router();

export default (app: Router) => {
  app.use("/elearning/transaksi/pertanyaan-dan-jawaban", router);

  const jawabanServiceInstance = Container.get(PertanyaanDanJawabanService);

  router.get("", async (req: Request, res: Response, next: NextFunction) => {
    try {
      let idSoal = req.query.idSoal;
      const data = await jawabanServiceInstance.GetPertanyaanByIdSoal(idSoal);
      // const dataPertanyaanGroup = await pertanyaanGroupServiceInstance.GetDataPertanyaanGroup(idSoal);

      return res.status(200).json({
        data: data,
        message: "Sukses",
        length: data.length,
      });
    } catch (e) {
      next(e);
    }
  });

  router.post(
    "", async (req: Request, res: Response, next: NextFunction) => {
      try {
        let idSoal = req.body.idSoal;
        
        let bodySave = {
            namaPertanyaan: req.body.namaPertanyaan,
            listJawaban: [...req.body.listJawaban]
        }
        const data = await jawabanServiceInstance.SimpanJawabanDanPertanyaan(
          idSoal,
          bodySave
        );

        return res.status(200).json({
          data: data,
          message: "Sukses",
          length: data.length,
        });
      } catch (e) {
        next(e);
      }
    }
  );
};
