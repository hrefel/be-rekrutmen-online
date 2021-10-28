import mongoose from "mongoose";

const MasterSubPertanyaanGroup = new mongoose.Schema(
  {
    namaPertanyaan: {
      type: String,
      required: [true, "Harap isi Deskripsi Pertanyaan"],
      index: true,
    },
    idPertanyaanGroup: mongoose.Schema.Types.ObjectId,
    statusEnabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<mongoose.Document>(
  "MasterSubPertanyaanGroup",
  MasterSubPertanyaanGroup
);
