import mongoose from "mongoose";

const MasterPertanyaanGroup = new mongoose.Schema(
  {
    deskripsiPertanyaan: {
      type: String,
      required: [true, "Harap isi Deskripsi Pertanyaan"],
      index: true,
    },
    idSoal: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Harap pilih Nama Soal"],
    },
    statusEnabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<mongoose.Document>(
  "MasterPertanyaanGroup",
  MasterPertanyaanGroup
);
