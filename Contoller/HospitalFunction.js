const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Hospital = require('../Models/Hospital');

const signUp = async (req, res) => {
  try {
    
    const { name, email, username, password } = req.body;

    const lowerCaseEmail = email.toLowerCase();
    console.log("Email for signup:", lowerCaseEmail);

    const exitingHospital = await Hospital.findOne({ email: lowerCaseEmail });
    if (exitingHospital) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newHospital = new Hospital({
      name,
      password: hashedPassword,
      email: lowerCaseEmail,
      username,
    });
    await newHospital.save();

    const payload = {
      email: lowerCaseEmail,
      _id: newHospital._id,
    };
    const token = jwt.sign(payload, "temporary_secret", { expiresIn: "10h" });
    res
      .status(201)
      .json({ message: "Hospital admin created successfully", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const lowerCaseEmail = email.toLowerCase();
    console.log("Email for login:", lowerCaseEmail);

    const hospital = await Hospital.findOne({ email: lowerCaseEmail });
    if (!hospital) {
      return res.status(400).json({ message: "Wrong email ID" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, hospital.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    const payload = {
      email: lowerCaseEmail,
      _id: hospital._id,
    };
    const token = jwt.sign(payload, "temporary_secret", { expiresIn: "10h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  signUp,
  logIn
}