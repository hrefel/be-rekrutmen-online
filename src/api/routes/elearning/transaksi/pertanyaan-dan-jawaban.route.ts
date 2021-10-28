import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";

import PertanyaanDanJawabanService from "../../../../services/elearning/transaksi/pertanyaan-dan-jawaban.service";
import MasterPertanyaanGroupService from "../../../../services/elearning/master/master-pertanyaan-group.service";

const router = Router();

export default (app: Router) => {
    app.use("/elearning/transaksi/get-pertanyaan-dan-jawaban", router);

    const jawabanServiceInstance = Container.get(PertanyaanDanJawabanService);
    router.get("", async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            let idSoal = req.query.idSoal;
            const data = await jawabanServiceInstance.GetPertanyaanByIdSoal(idSoal);
            // const dataPertanyaanGroup = await pertanyaanGroupServiceInstance.GetDataPertanyaanGroup(idSoal);


            return res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    });
};
