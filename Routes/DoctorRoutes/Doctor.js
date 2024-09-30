const express = require('express');
const router = express.Router();

const {
    login
} = require("../../Contoller/Doctor/DoctorFunctions");

router.post('/login',login);

module.exports = router;
