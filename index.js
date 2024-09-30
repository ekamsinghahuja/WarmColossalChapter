// *Imports*
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

/* env setUp */
const app = express();
const port = 3000;

/* MiddelWares */
app.use(cors());
app.use(express.json());


/* DB connection */
mongoose.connect("mongodb+srv://ekamsinghahuja123:gX0j4DeWlfXgMQrN@cluster0.1brfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));


/* Routers Imported */
const nodeRouter = require('./Routes/NodeRoutes/NodeRoutes'); 
const hospitalRouter = require('./Routes/HospitalRoutes');

const adminNodeRouter =  require('./Routes/HospitalAdminRoutes/adminNodeRoutes')
const adminpatientRouter = require('./Routes/HospitalAdminRoutes/adminPatientRoutes')
const adminDooctorRouter = require('./Routes/HospitalAdminRoutes/adminDoctorRoute');

/* Routers Used */
app.use('/nodes',nodeRouter);
app.use('/hospital',hospitalRouter);

/* admin route */
app.use('/hospitalAdmin/node',adminNodeRouter);
app.use('/hospitalAdmin/patient',adminpatientRouter);
app.use('/hospitalAdmin/Doctor',adminDooctorRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});








// .env
// doctor router integrate
// paths
// get -> parameter
// status