
import mongoose from 'mongoose';

const MasterJawaban = new mongoose.Schema(
  {
    namaJawaban: {
      type: String,
      required: [true, 'Harap isi Nama Jawaban'],
      index: true,
    },
    idPertanyaan: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Harap pilih Nama Soal']
    },
    jawabanBenar: {
        type: Boolean,
        required: true,
        default: false
    },
    statusEnabled: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true },
);

export default mongoose.model<mongoose.Document>('masterJawaban', MasterJawaban);
