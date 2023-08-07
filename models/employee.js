


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  otherCity: { type: Boolean, default: false },
  skills: [{ type: String, enum: ['AWS', 'DevOps', 'Full Stack Developer', 'Middleware', 'Qa-Automation', 'Webservices'] }]
},{ timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;