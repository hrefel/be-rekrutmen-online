import { Service, Inject } from "typedi";

@Service()
export default class MasterJawabanService {
    constructor(@Inject("masterJawabanModel") private masterJawabanModel) {}

    public async TambahJawaban(data) {
        try {
            const dataRecord = this.masterJawabanModel.create({
                ...data,
            });

            return dataRecord;
        } catch (e) {
            throw e;
        }
    }

    public async GetAllJawaban() {
        try {
            const data = this.masterJawabanModel.find();

            return data;
        } catch (e) {
            throw e;
        }
    }

    public async GetJawabanByParams(param: object) {
        try {
            const data = this.masterJawabanModel.find(param);

            return data;
        } catch (e) {
            throw e;
        }
    }
}
