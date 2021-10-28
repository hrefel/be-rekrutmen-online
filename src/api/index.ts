import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import agendash from './routes/agendash';
import masterSoal from './routes/elearning/master/master-soal.route';
import masterPertanyaan from './routes/elearning/master/master-pertanyaan.route';
import masterJawaban from './routes/elearning/master/master-jawaban.route';
import masterJawabanGroup from './routes/elearning/master/master-jawaban-group.route';
import masterPertanyaanGroup from './routes/elearning/master/master-pertanyaan-group.route';

import pertanyaanDanJawabanRoute from './routes/elearning/transaksi/pertanyaan-dan-jawaban.route';
// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	agendash(app);

	masterSoal(app);
	masterPertanyaan(app);
	masterJawaban(app);
	masterJawabanGroup(app);
	masterPertanyaanGroup(app);
	
	pertanyaanDanJawabanRoute(app);
	return app
}