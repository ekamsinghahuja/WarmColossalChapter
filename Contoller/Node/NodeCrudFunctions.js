const Node = require('../../Models/Node');
const updateNode = async (req, res) => {
  try{
    const { node_id, heart_rate, spo2, temperature } = req.body;
    if(!node_id){
      res.status(500).json({ message: 'provide correct id'});
    }
    const node = await Node.findById(node_id);
    if(!node){
      res.status(500).json({ message: 'node not found'});
    }

    node.heart_rate.push(...heart_rate);
    node.spo2.push(...spo2);
    node.temperature.push(...temperature);
    await node.save(); 
    res.status(200).json({ message: 'Node data updated successfully', data: node });
  } 
  catch(error){
    console.log(error);
    res.status(500).json({ message: 'Error creating Node data', error: error.message });
  }
};

module.exports = {  
  updateNode,
};