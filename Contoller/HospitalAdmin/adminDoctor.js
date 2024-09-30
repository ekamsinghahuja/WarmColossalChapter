const Doctor = require("../../Models/Doctor");
const Hospital = require("../../Models/Hospital");
const bcrypt = require('bcrypt');

//create doctor ki jagah add doctor krna hai 
// doctor apna acc banae ga  fir hospital wale admin babu  use add kr len ge 
const createDoctor = async (req, res, next) => {
  try {
    const { name, spec, hospital_id, username, email, password, age, gender } = req.body;

    
    const hospital = await Hospital.findById(hospital_id);
    if (!hospital) {
      return next(createError(404, "Hospital not found"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new Doctor({
      name,
      spec,
      username,
      email,
      hashedPassword, 
      age,
      gender,
    });
    const savedDoctor = await newDoctor.save();
    hospital.doctors.push(savedDoctor._id);
    await hospital.save();

    res.status(201).json(savedDoctor);
  } catch (err) {
    next(createError(500, err.message));
  }
};


const deleteDoctor = async (req, res, next) => {
  try {
    const doctorId = req.body.id;
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
    if (!deletedDoctor) {
      return next(createError(404, "Doctor not found"));
    }
    await Hospital.updateMany(
      { doctors: doctorId },
      { $pull: { doctors: doctorId } }
    );

    res.status(200).json({ message: "Doctor deleted successfully" });
  } 
  catch (err) {
    next(createError(500, err.message));
  }
};

module.exports = { createDoctor, deleteDoctor };
