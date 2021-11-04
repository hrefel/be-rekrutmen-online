import { Service, Inject } from "typedi";

@Service()
export default class MasterSoalService {
  constructor(@Inject("masterSoalModel") private masterSoalModel) {}

  public async TambahSoal(data) {
    try {
      const dataRecord = this.masterSoalModel.create({
        ...data,
      });

      return dataRecord;
    } catch (e) {
      throw e;
    }
  }

  public async GetAllSoal() {
    try {
      const data = this.masterSoalModel.find({statusEnabled: true});

      return data;
    } catch (e) {
      throw e;
    }
  }

  public async GetSoalByParams(param) {
    try {
      const data = param._id ? this.masterSoalModel.findOne(param) : this.masterSoalModel.find(param);
      
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async EditSoal(data) {
    try {
      return this.masterSoalModel.updateOne({_id: data._id}, data);
    } catch (e) {
      throw e;
    }
  }

  public async DeleteData(data) {
      try {
          return this.masterSoalModel.updateOne({_id: data._id}, data);
      } catch (e) {
          throw e;
      }
  }
}
