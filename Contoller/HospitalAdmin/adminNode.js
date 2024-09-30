const Node = require('../../Models/Node');

/* tested */

/* create node */
const createNode = async (req, res) => {
  try {
    const {hospital_id} = req.body;
    if (!hospital_id) {
      return res.status(400).json({ message: 'Hospital ID is required' });
    }
    const newNode = new Node({
        hospital_id:hospital_id,
    });
    await newNode.save();
    res.status(201).json({
      message: 'Node created successfully',
      id: newNode._id 
    });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error creating Node', error: error.message });
  }
};

/* delete Node */
const deleteNode = async (req, res) => {
  try {
    const id = req.body._id;
    if (!id) {
      return res.status(404).json({ message: 'id not provided' });
    }
    const node = await Node.findByIdAndDelete(id);
    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }
    res.json({ message: 'Node deleted successfully' });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* all nodes of a hospital */
const getAllNodes = async(req,res)=>{
  try{
    const {hospital_id} = req.body;
    const n = await Node.find({hospital_id:hospital_id});
    res.json(n);
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
} 

module.exports = { 
  createNode, 
  deleteNode,
  getAllNodes
};