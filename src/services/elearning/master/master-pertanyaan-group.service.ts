import { Service, Inject } from "typedi";

@Service()
export default class MasterPertanyaanGroupService {
  constructor(
    @Inject("MasterPertanyaanGroupModel") private MasterPertanyaanGroupModel,
    @Inject("MasterSubPertanyaanGroupModel") private MasterSubPertanyaanGroupModel
  ) {}

  public async TambahDataPertanyaanGroup(data) {
    try {
      const dataRecord = this.MasterPertanyaanGroupModel.create({
        ...data,
      });

      return dataRecord;
    } catch (e) {
      throw e;
    }
  }

  public async TambahDataSubPertanyaanGroup(data) {
      try {
          const dataRecord = this.MasterSubPertanyaanGroupModel.create({
              ...data
          });

          return dataRecord;
      } catch (e) {
          throw(e);
      }
  }

  private async GetDataSubPertanyaanGroup(params) {
    try {
      const subPertanyaan = this.MasterSubPertanyaanGroupModel.find(params)

      return subPertanyaan;
    } catch (e) {
      throw(e);
    }
  }

  public async GetDataPertanyaanGroup(param) {
    try {
        let result = [];
        const pertanyaan = await this.MasterPertanyaanGroupModel.find(param);
        
        for(let i = 0; i <pertanyaan.length; i++) {
          let subPertanyaan = await this.MasterSubPertanyaanGroupModel.find({idPertanyaanGroup: pertanyaan[i]._id});
          result.push({
            deskripsi: pertanyaan[i].deskripsiPertanyaan,
            listPertanyaan: [...subPertanyaan]
          });  
        }

        return result;
    } catch (e) {
        throw e;
    }
  }
}
