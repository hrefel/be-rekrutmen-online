import { Service, Inject } from "typedi";
import { Container } from "typedi";
import MasterPertanyaanService from "../master/master-pertanyaan.service";
import MasterJawabanService from "../master/master-jawaban.service";
import MasterPertanyaanGroupService from "../master/master-pertanyaan-group.service";

@Service()
export default class PertanyaanDanJawabanService {
  masterPertanyaanServiceInstance = Container.get(MasterPertanyaanService);
  jawabanServiceInstance = Container.get(MasterJawabanService);
  masterPertanyaanGroupServiceInstance = Container.get(MasterPertanyaanGroupService);
  
  constructor(
    @Inject("masterJawabanModel") private masterJawabanModel,
    @Inject("masterPertanyaanModel") private masterPertanyaanModel
  ) {}

  public async GetPertanyaanByIdSoal(idSoal) {
    try {
      let result = [];

      const resPertanyaanGroup = await this.masterPertanyaanGroupServiceInstance.GetDataPertanyaanGroup({idSoal: idSoal}).then((res: any) => {
        return res;
      });

      
      const resPertanyaan:any = await this.masterPertanyaanServiceInstance.GetPertanyaanByParams({
        idSoal: idSoal
      }).then((res: any) => {
        return res;
      });
      
      
      for(let i = 0; i < resPertanyaan.length; i++) {

        let jawaban = await this.jawabanServiceInstance.GetJawabanByParams({
          idPertanyaan: resPertanyaan[i]._id
        });

        result.push({
          isGroup: false,
          pertanyaan: resPertanyaan[i].namaPertanyaan,
          pilihanJawaban: []
        })

        for(let ii = 0; ii < jawaban.length; ii++) {
          result[i].pilihanJawaban.push({
            namaJawaban: jawaban[ii].namaJawaban,
            id: jawaban[ii]._id,
            jawabanBenar: jawaban[ii].jawabanBenar
          });
        }

      }

      for(let i = 0; i < resPertanyaanGroup.length; i++) {
        let tempListPertanyaan = [];
       

        for(let ii = 0; ii < resPertanyaanGroup[i].listPertanyaan.length; ii++) {
          let jawaban = await this.jawabanServiceInstance.GetJawabanByParams({
            idPertanyaan: resPertanyaanGroup[i].listPertanyaan[ii]._id
          });
          tempListPertanyaan.push({
            pertanyaan: resPertanyaanGroup[i].listPertanyaan[ii].namaPertanyaan,
            jawaban: [...jawaban]
          })
        }

        result.push({
          isGroup: true,
          deskripsi: resPertanyaanGroup[i].deskripsi,
          listPertanyaan: [...tempListPertanyaan]
        })
      }
      
      
      
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async SimpanJawabanDanPertanyaan(idSoal, body) {
    try {
      let bodySavePertanyaan = {
        namaPertanyaan: body.namaPertanyaan,
        idSoal: idSoal
      }

      
      const pertanyaan = await this.masterPertanyaanServiceInstance.TambahPertanyaan(bodySavePertanyaan).then(res => {
        for(let i = 0; i < body.listJawaban.length; i++) {
          let bodySaveJawaban = {
            jawabanBenar: body.listJawaba[i].jawabanBenar,
            namaJawaban: body.listJawaban[i].namaJawaban,
            idPertanyaan: res._id
          }
          this.jawabanServiceInstance.TambahJawaban(bodySaveJawaban);
        }
        return res;
      });

      return pertanyaan;
    } catch (e) {
      throw e;
    }
   
  }
}
