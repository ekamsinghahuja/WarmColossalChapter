const express = require('express');
const router = express.Router();
const {
       updateNode
} = require('../../Contoller/Node/NodeCrudFunctions');

router.post('/add_data',updateNode);  


module.exports = router;