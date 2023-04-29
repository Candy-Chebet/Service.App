//create an API endpoint for handling requests related to faculty tickets

//create model for the faculty tickets in MongoDB
const mongoose = require('mongoose');

const FacultyTicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  problem: { type: String, required: true },
  description: { type: String, required: true },
  priorityLevel: { type: String, required: true },
  departmentAssigned: { type: String, required: true },
});

const FacultyTicket = mongoose.model('FacultyTicket', FacultyTicketSchema);

module.exports = FacultyTicket;


