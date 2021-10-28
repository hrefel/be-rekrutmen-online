
import mongoose from 'mongoose';

const MasterPertanyaan = new mongoose.Schema(
  {
    namaPertanyaan: {
      type: String,
      required: [true, 'Harap isi Nama Pertanyaan'],
      index: true,
    },
    idSoal: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"masterSoal",
        required: [true, 'Harap pilih Nama Soal']
    },
    statusEnabled: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true },
);

export default mongoose.model<mongoose.Document>('masterPertanyaan', MasterPertanyaan);
