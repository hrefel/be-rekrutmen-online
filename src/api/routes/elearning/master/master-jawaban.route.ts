import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import MasterJawabanService from "../../../../services/elearning/master/master-jawaban.service";
import { Container } from "typedi";

const router = Router();

export default (app: Router) => {
    app.use("/elearning/master/jawaban", router);

    const jawabanServiceInstance = Container.get(MasterJawabanService);

    router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await jawabanServiceInstance.GetAllJawaban();

            return res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    });

    router.post(
        "/save",
        celebrate({
            body: Joi.object({
                namaJawaban: Joi.string().required(),
                idPertanyaan: Joi.string().required(),
                jawabanBenar: Joi.boolean().required()
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const jawaban = await jawabanServiceInstance.TambahJawaban(req.body);

                return res.status(201).json({
                    data: jawaban,
                    message: "Data Master jawaban berhasil disimpan",
                });
            } catch (e) {
                next(e);
            }
        }
    );

    router.get(
        "/get-by-param",
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                let param = {
                    namaJawaban: new RegExp(req.query.namaJawaban, "i"),
                    idPertanyaan: new RegExp(req.query.idPertanyaan, "i")
                };
                const data = await jawabanServiceInstance.GetJawabanByParams(
                    param
                );

                return res.status(200).json(data);
            } catch (e) {
                next(e);
            }
        }
    );
};
