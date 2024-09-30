
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Middleware/Admin/auth');

const {
  createNode,
  // deleteNode,
  getAllNodes
} = require('../../Contoller/HospitalAdmin/adminNode');

router.post('/create',authMiddleware,createNode);
// router.post('/delete',authMiddleware,deleteNode);
router.get('/getAllNodes',authMiddleware,getAllNodes);
module.exports = router;

