const express = require('express');
const router = express.Router();

const { 
  signUp, 
  logIn 
} = require('../Contoller/HospitalFunction');

router.post('/signup', signUp);
router.post('/login', logIn);


module.exports = router;