const Doctor = require("../../Models/Doctor");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
    
        const lowerCaseEmail = email.toLowerCase();
        console.log("Email for login:", lowerCaseEmail);
    
        const doctor = await Doctor.findOne({ email: lowerCaseEmail });
        if (!doctor) {
          return res.status(400).json({ message: "Wrong email ID" });
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, doctor.password);
        if (!isPasswordCorrect) {
          return res.status(400).json({ message: "Password incorrect" });
        }
    
        const payload = {
          email: lowerCaseEmail,
          _id: doctor._id,
        };
        const token = jwt.sign(payload, "temporary_secret", { expiresIn: "10h" });
        res.status(200).json({ message: "Login successful", token });
      } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports = { login }