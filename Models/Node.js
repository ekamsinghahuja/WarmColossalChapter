const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSeriesDataSchema = new Schema({
  timestamp: { type: Date, required: true },
  value: { type: Number, required: true },
  _id:false,
});

const nodeSchema = new Schema({
  hospital_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Hospital', 
    required: true 
  },  
  heart_rate: { type: [timeSeriesDataSchema], default: [] },
  spo2: { type: [timeSeriesDataSchema], default: [] },
  temperature: { type: [timeSeriesDataSchema], default: [] }
});

const Node = mongoose.model('Node', nodeSchema);

module.exports = Node;
