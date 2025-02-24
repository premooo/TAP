const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true }, 
  type: { type: String, required: true, enum: ["Full-time", "Part-time", "Contract", "Internship"] },
  salary: { type: String, required: false }, 
  postedDate: { type: Date, default: Date.now }, 
  closingDate: { type: Date, required: false },
  responsibilities: { type: [String], required: false },
  qualifications: { type: [String], required: false }, 
  benefits: { type: [String], required: false }, 
  company: { type: String, required: true }, 
  contactEmail: { type: String, required: true }, 
});

module.exports = mongoose.model("Career", careerSchema);
