import { Service, Inject } from "typedi";

@Service()
export default class MasterKategoriService {
  constructor(@Inject("masterKategoriModel") private masterKategoriModel) {}

  public async TambahKategori(data) {
    try {
      const dataRecord = this.masterKategoriModel.create({
        ...data,
      });

      return dataRecord;
    } catch (e) {
      throw e;
    }
  }

  public async GetAllKategori() {
    try {
      const data = this.masterKategoriModel.find({statusEnabled: true});

      return data;
    } catch (e) {
      throw e;
    }
  }

  public async GetKategoriByParams(param) {
    try {
      const data = param._id ? this.masterKategoriModel.findOne(param) : this.masterKategoriModel.find(param);
      
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async EditKategori(data) {
    try {
      return this.masterKategoriModel.updateOne({_id: data._id}, data);
    } catch (e) {
      throw e;
    }
  }

  public async DeleteData(data) {
      try {
          return this.masterKategoriModel.updateOne({_id: data._id}, data);
      } catch (e) {
          throw e;
      }
  }
}
