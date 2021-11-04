import { Service, Inject } from "typedi";
import masterJenjangPendidikanModel from "../../models/master/master-jenjang-pendidikan.model";

@Service()
export default class MasterKategoriService {
  constructor(
    @Inject("lowonganModel") private lowonganModel,
    @Inject("masterJenjangPendidikanModel")
    private masterJenjangPendidikanModel,
    @Inject("masterKategoriModel") private masterKategoriModel
  ) {}

  public async GetLowongan(query) {
    try {
      let result = [];
      let objId = require("mongoose").Types.ObjectId;
      let queryParam: any = {
        statusEnabled: true,
      };
      if (query.judulLowongan)
        queryParam.judulLowongan = new RegExp(query.judulLowongan, "i");
      if (query.kategori) queryParam.kategori = new objId(query.kategori);
      if (query.jenjangPendidikan)
        queryParam.jenjangPendidikan = new objId(query.jenjangPendidikan);

      // GET Lowongan
      const data = await this.lowonganModel.find(queryParam);
        // GET Kategori dan Jenjang
      for (let i = 0; i < data.length; i++) {
        let pendidikan = await this.masterJenjangPendidikanModel.findOne({_id: data[i].jenjangPendidikan});
        let kategori = await this.masterKategoriModel.findOne({_id: data[i].kategori});
        result.push({
          judulLowongan: data[i].judulLowongan,
          deskripsi: data[i].deskripsi,
          lowonganKadaluarsa: data[i].lowonganKadaluarsa,
          kategori: kategori.namaKategori,
          jenjangPendidikan: pendidikan.namaPendidikan,
          tglTerbit: data[i].tglTerbit
        })

      }
      return result;
    } catch (e) {
      throw e;
    }
  }
}
