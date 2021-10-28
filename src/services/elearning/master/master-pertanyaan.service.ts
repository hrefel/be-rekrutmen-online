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

    public async GetPertanyaanByParams(param: object) {
        try {
            const data = this.masterPertanyaanModel.find(param);
            

            return data;
        } catch (e) {
            throw e;
        }
    }
}
