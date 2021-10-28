export const elearningMasterModel = [
    {
        name: 'masterSoalModel',
        model: require('./master-soal.model').default
    }, {
        name: 'masterPertanyaanModel',
        model: require('./master-pertanyaan.model').default
    }, {
        name: 'masterJawabanModel',
        model: require('./master-jawaban.model').default
    }, {
        name: 'masterJawabanGroupModel',
        model: require('./master-jawaban-group-model').default
    }, {
        name: 'MasterPertanyaanGroupModel',
        model: require('./master-pertanyaan-group.model').default
    }, {
        name: 'MasterSubPertanyaanGroupModel',
        model: require('./master-sub-pertanyaan-group.model').default
    }
]