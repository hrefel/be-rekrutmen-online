import mongoose from "mongoose";

const Lowongan = new mongoose.Schema(
  {
    judulLowongan: {
      type: String,
      required: [true, "Harap isi Judul Lowongan"],
      index: true,
    },
    lowonganKadaluarsa: Date,
    deskripsi: String,
    maxPeserta: {
      type: Number,
      default: 0
      // 0 is unlimited
    },
    jmlPeserta: {
      type: Number,
      default: 0
    },
    tglTerbit: {
      type: Date,
      default: Date.now()
    },
    kategori: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterKategori",
      required: [true, "Harap pilih Kategori"],
    },
    jenjangPendidikan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterJenjangPendidikan",
    },
    statusEnabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<mongoose.Document>("Lowongan", Lowongan);
