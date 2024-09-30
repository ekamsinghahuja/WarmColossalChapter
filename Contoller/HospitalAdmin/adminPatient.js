const Hospital = require('../../Models/Hospital');
const Patient = require('../../Models/Patient');

/* tested */
// Create a new patient
const createPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      hospital_id,
      node_id,
      room,
      bed
    } = req.body;
    const newPatient = new Patient({
      name:name,
      age:age,
      gender:gender,
      hospital_id:hospital_id,
      node_id:node_id,
      room:room,
      bed:bed,
      
    });
    await newPatient.save();
    res.status(201).json(newPatient);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const hospital_id = req.body.hospital_id;
    const patients = await Patient.find({hospital_id:hospital_id});
    res.status(200).json(patients);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a specific patient by ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.body.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a patient by ID
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.body.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  deletePatient
}