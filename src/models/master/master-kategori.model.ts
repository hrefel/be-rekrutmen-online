import mongoose from "mongoose";

const Kategori = new mongoose.Schema(
  {
    namaKategori: {
      type: String,
      required: [true, "Harap isi Nama Kategori"],
      index: true,
    },
    type: Number,
    statusEnabled: {
      type: Boolean,
      default: true
    }
  }, 
  { timestamps: true }
);

export default mongoose.model<mongoose.Document>(
  "masterKategori",
  Kategori
);
