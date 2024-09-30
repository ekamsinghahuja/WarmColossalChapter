const Doctor = require("../../Models/Doctor");
const Patient = require('../../Models/Patient');
const Node = require("../../Models/Node");

const AddPatient = async(req,res)=>{
    try{
        const {doctor_id , patient_id} = req.body; 
        const doctor = await Doctor.findOne({_id:doctor_id});
        if(!doctor){
            return res.json({message:"doctor not found"});
        }
        const patient = await Patient.findOne({_id:patient_id});
        if (!patient) {
            return res.json({ message: "Patient not found" });
        }
        doctor.patients.push(patient_id);
        await doctor.save();
        return res.json({ message: "Patient added successfully", doctor });

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
} 


const RemovePatient = async (req, res) => {
    try {
        const { doctor_id, patient_id } = req.body;
        const doctor = await Doctor.findOne({ _id: doctor_id });
        if (!doctor) {
            return res.json({ message: "Doctor not found" });
        }
        const patient = await Patient.findOne({ _id: patient_id });
        if (!patient) {
            return res.json({ message: "Patient not found" });
        }
        doctor.patients.pull(patient_id);
        await doctor.save();

        return res.json({ message: "Patient removed successfully", doctor });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



const getInfo = async (req, res) => {
    try {
        const { doctor_id } = req.body;
        const doctor = await Doctor.findOne({ _id: doctor_id })
            .populate({
                path: 'patients',
                populate: {
                    path: 'node_id',  
                    model: 'Node'
                },
                select: '-hospital_id'  
            });
        if(!doctor){
            return res.json({ message: "Doctor not found" });
        }

        return res.json({ message: "Doctor info fetched successfully", doctor });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



module.exports = {
    AddPatient,
    RemovePatient,
    getInfo
}











