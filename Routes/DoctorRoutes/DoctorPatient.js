const express = require('express');
const router = express.Router();

const {
    AddPatient,
    RemovePatient,
    getInfo
} = require('../../Contoller/Doctor/doctorPatients');

const authMiddleware = require('../../Middleware/Doctor/auth');

router.post('/add',authMiddleware,AddPatient);
router.delete('/delete',authMiddleware,RemovePatient);
router.get('/getAll',authMiddleware,getInfo);

module.exports = router;