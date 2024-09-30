const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Middleware/Admin/auth');


const { 
  createDoctor, 
  deleteDoctor 
} = require('../../Contoller/HospitalAdmin/adminDoctor');

router.post('/create',authMiddleware,createDoctor);
router.delete('/delete',authMiddleware,deleteDoctor);


module.exports = router;

