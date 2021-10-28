import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import MasterJawabanGroupService from "../../../../services/elearning/master/master-jawaban-group.service";
import { Container } from "typedi";

const router = Router();

export default (app: Router) => {
    app.use("/elearning/master/jawaban-group", router);

    const jawabangGroupServiceInstance = Container.get(MasterJawabanGroupService);

    router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await jawabangGroupServiceInstance.GetAllJawaban();

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
                const jawaban = await jawabangGroupServiceInstance.TambahJawaban(req.body);

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
                const data = await jawabangGroupServiceInstance.GetJawabanByParams(
                    param
                );

                return res.status(200).json(data);
            } catch (e) {
                next(e);
            }
        }
    );
};
