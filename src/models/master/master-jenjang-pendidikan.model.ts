import mongoose from "mongoose";

const JenjangPendidikan = new mongoose.Schema(
  {
    namaPendidikan: {
      type: String,
      required: [true, "Harap isi Nama Kategori"],
      index: true,
    },
    statusEnabled: {
      type: Boolean,
      default: true
    }
  }, 
  { timestamps: true }
);

export default mongoose.model<mongoose.Document>(
  "masterJenjangPendidikan",
  JenjangPendidikan
);
