import { Service, Inject } from "typedi";

@Service()
export default class MasterPertanyaanService {
    constructor(@Inject("masterPertanyaanModel") private masterPertanyaanModel) {}

    public async TambahPertanyaan(data) {
        try {
            const dataRecord = this.masterPertanyaanModel.create({
                ...data,
            });

            return dataRecord;
        } catch (e) {
            throw e;
        }
    }

    public async GetAllPertanyaan() {
        try {
            const data = this.masterPertanyaanModel.find();

            return data;
        } catch (e) {
            throw e;
        }
    }

    public async GetPertanyaanByParams(param: any) {
        try {
            // FIND By ObjectId
            let objId = require('mongoose').Types.ObjectId;
            let parameter = {
                idSoal: new objId(param.idSoal),
                statusEnabled: true
            }
            
            const data = this.masterPertanyaanModel.find(parameter);

            return data;
        } catch (e) {
            throw e;
        }
    }
}
