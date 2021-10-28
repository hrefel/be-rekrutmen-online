import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import MasterPertanyaanGroupService from "../../../../services/elearning/master/master-pertanyaan-group.service";
import { Container } from "typedi";

const router = Router();

export default (app: Router) => {
    app.use("/elearning/master/pertanyaan-group", router);

    const pertanyaanServiceInstance = Container.get(MasterPertanyaanGroupService);

    router.post(
        "/save",
        celebrate({
            body: Joi.object({
                deskripsiPertanyaan: Joi.string().required(),
                // listPertanyaan: Joi.array(),
                idSoal: Joi.string().required()
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const pertanyaan = await pertanyaanServiceInstance.TambahDataPertanyaanGroup(req.body);

                return res.status(201).json({
                    data: pertanyaan,
                    message: "Data berhasil disimpan",
                });
            } catch (e) {
                console.log(e);
                next(e);
            }
        }
    );

    router.post(
        "/save-sub-pertanyaan",
        celebrate({
            body: Joi.object({
                namaPertanyaan: Joi.string().required(),
                idPertanyaanGroup: Joi.string().required()
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const pertanyaan = await pertanyaanServiceInstance.TambahDataSubPertanyaanGroup(req.body);

                return res.status(201).json({
                    data: pertanyaan,
                    message: "Data berhasil disimpan",
                });
            } catch (e) {
                next(e);
            }
        }
    );

    router.get(
        "/get",
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                
                let param = {
                    idSoal: req.query.idSoal
                };
                const data = await pertanyaanServiceInstance.GetDataPertanyaanGroup(
                    param
                );

                return res.status(200).json(data);
            } catch (e) {
                next(e);
            }
        }
    );
};
