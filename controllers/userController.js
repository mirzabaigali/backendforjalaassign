const UserModel = require("../models/userModel")
const Employee  = require("../models/employee.js")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const getAllProducts = async(req,res)=>{
  res.status(200).json({msg:"iam getting all products"})
}
const getAllProductsTesting = async(req,res)=>{
    res.status(200).json({msg:"iam getting all products from testing"})
  }
  
 
  const login = async function (req, res) {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email }).exec();
  
        if (!user) {
          return res.status(404).json({ status: "failed", message: "You are not a Registered User" });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (isMatch) {
          // Generate JWT Token
          const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
          return res.status(200).json({ status: "success", message: "Login Success", token: token });
        } else {
          return res.status(401).json({ status: "failed", message: "Email or Password is not Valid" });
        }
      } else {
        return res.status(400).json({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: "failed", message: "Unable to Login" });
    }
  };
  

const register = async (req, res) => {
  const { name, email, password, password_confirmation, tc } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (user) {
    res.send({ "status": "failed", "message": "Email already exists" });
  } else {
    if (name && email && password && password_confirmation && tc) {
      if (password === password_confirmation) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
            tc: tc
          });
          await doc.save();
          const saved_user = await UserModel.findOne({ email: email });
          // Generate JWT Token
          const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
          res.status(201).send({ "status": "success", "message": "Registration Success", "token": token });
        } catch (error) {
          console.log(error);
          res.send({ "status": "failed", "message": "Unable to Register" });
        }
      } else {
        res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" });
      }
    } else {
      res.send({ "status": "failed", "message": "All fields are required" });
    }
  }
};




const createEmployee = async (req, res) => {
  try {
    // Extract employee details from the request body
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      dateOfBirth,
      gender,
      address,
      country,
      city,
      otherCity,
      otherCityName,
      skills,
    } = req.body;

    // Check if required fields are provided
    if (!firstName || !lastName || !email || !mobileNumber || !dateOfBirth || !gender || !address || !country  || !skills) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email is already registered for an employee
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(409).json({ message: 'Employee with this email already exists' });
    }

    // Create a new employee instance using the Employee model
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      mobileNumber,
      dateOfBirth,
      gender,
      address,
      country,
      city,
      otherCity,
      skills,
    });

    if (otherCity) {
      newEmployee.city = otherCityName;
    }

    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    res.status(201).json({ message: 'Employee created successfully', employee: savedEmployee }); // Respond with the saved employee details
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get all employee list
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};
//get employye by id
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
};

//del a employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the employee by ID and delete it
    const deletedEmployee = await Employee.findByIdAndRemove(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
}
//edit employee
const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    // Find the employee by ID and update it
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' }); 
  } catch (error) {
    res.status(500).json({ message: 'Error editing employee', error: error.message });
  }
};


  
module.exports={getAllProducts,getAllProductsTesting,login,register,createEmployee,getAllEmployees,deleteEmployee,editEmployee,getEmployeeById}