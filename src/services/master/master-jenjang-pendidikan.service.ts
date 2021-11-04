import { Service, Inject } from "typedi";

@Service()
export default class MasterJenjangPendidikanService {
  constructor(@Inject("masterJenjangPendidikanModel") private masterJenjangPendidikanModel) {}

  public async TambahJenjangPendidikan(data) {
    try {
      const dataRecord = this.masterJenjangPendidikanModel.create({
        ...data,
      });

      return dataRecord;
    } catch (e) {
      throw e;
    }
  }

  public async GetAllJenjangPendidikan() {
    try {
      const data = this.masterJenjangPendidikanModel.find({statusEnabled: true});

      return data;
    } catch (e) {
      throw e;
    }
  }

  public async GetJenjangPendidikanByParams(param) {
    try {
      const data = param._id ? this.masterJenjangPendidikanModel.findOne(param) : this.masterJenjangPendidikanModel.find(param);
      
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async EditJenjangPendidikan(data) {
    try {
      return this.masterJenjangPendidikanModel.updateOne({_id: data._id}, data);
    } catch (e) {
      throw e;
    }
  }

  public async DeleteData(data) {
      try {
          return this.masterJenjangPendidikanModel.updateOne({_id: data._id}, data);
      } catch (e) {
          throw e;
      }
  }
}
