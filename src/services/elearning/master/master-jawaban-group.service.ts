import { Service, Inject } from "typedi";

@Service()
export default class MasterJawabanGroupService {
    constructor(@Inject("masterJawabanGroupModel") private masterJawabanGroupModel) {}

    public async TambahJawaban(data) {
        try {
            const dataRecord = this.masterJawabanGroupModel.create({
                ...data,
            });

            return dataRecord;
        } catch (e) {
            throw e;
        }
    }

    public async GetAllJawaban() {
        try {
            const data = this.masterJawabanGroupModel.find();

            return data;
        } catch (e) {
            throw e;
        }
    }

    public async GetJawabanByParams(param: object) {
        try {
            const data = this.masterJawabanGroupModel.find(param);

            return data;
        } catch (e) {
            throw e;
        }
    }
}
