const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  spec: { type: String, required: true },
  patients: { type: [mongoose.Schema.Types.ObjectId], ref: 'Patient', default: [] } 
});

module.exports = mongoose.model('Doctor', doctorSchema);
