
import mongoose from 'mongoose';

const MasterSoal = new mongoose.Schema(
  {
    namaSoal: {
      type: String,
      required: [true, 'Harap isi Nama Soal'],
      index: true,
    },
    waktuPengerjaan: Number,
    createdBy: String,
    status: {
      type: Boolean,
      default: false
    },
    statusEnabled: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true },
);

export default mongoose.model<mongoose.Document>('masterSoal', MasterSoal);
