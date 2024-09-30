const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Middleware/Admin/auth');


const {
  createPatient,
  getAllPatients,
  getPatientById,
  deletePatient
} = require('../../Contoller/HospitalAdmin/adminPatient');

router.post('/create',authMiddleware,createPatient);
router.delete('/delete',authMiddleware,deletePatient);
router.get('/getAllPatient',authMiddleware,getAllPatients);
router.get('/getById',authMiddleware,getPatientById);
module.exports = router;
