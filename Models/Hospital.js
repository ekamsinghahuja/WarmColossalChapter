const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  doctors: { type: [mongoose.Schema.Types.ObjectId], ref: 'Doctor', default: [] } 
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
