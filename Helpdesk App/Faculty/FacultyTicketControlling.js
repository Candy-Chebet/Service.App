//create a controller to handle requests related to faculty tickets
const FacultyTicket = require('../models/FacultyTicket');

exports.create = (req, res) => {
  const facultyTicket = new FacultyTicket({
    name: req.body.name,
    problem: req.body.problem,
    description: req.body.description,
    priorityLevel: req.body.priorityLevel,
    departmentAssigned: req.body.departmentAssigned,
  });

  facultyTicket.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Faculty Ticket."
      });
    });
};

exports.findAll = (req, res) => {
  FacultyTicket.find()
    .then(facultyTickets => {
      res.send(facultyTickets);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving faculty tickets."
      });
    });
};

exports.findOne = (req, res) => {
  FacultyTicket.findById(req.params.facultyTicketId)
    .then(facultyTicket => {
      if (!facultyTicket) {
        return res.status(404).send({
          message: "Faculty Ticket not found with id " + req.params.facultyTicketId
        });
      }
      res.send(facultyTicket);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Faculty Ticket not found with id " + req.params.facultyTicketId
        });
      }
      return res.status(500).send({
        message: "Error retrieving faculty ticket with id " + req.params.facultyTicketId
      });
    });
};

exports.update = (req, res) => {
  FacultyTicket.findByIdAndUpdate(req.params.facultyTicketId, {
    name: req.body.name,
    problem: req.body.problem,
    description: req.body.description,
    priorityLevel: req.body.priorityLevel,
    departmentAssigned: req.body.departmentAssigned,
  }, { new: true })
    .then(facultyTicket => {
      if (!facultyTicket) {
        return res.status(404).send({
          message: "Faculty Ticket not found with id " + req.params.facultyTicketId
        });
      }
      res.send(facultyTicket);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Faculty Ticket not found with id " + req.params.facultyTicketId
        });
      }
      return res.status(500).send({
        message: "Error updating faculty tickket with id " + req.params.facultyTicketId
      });
    });
};

exports.delete = (req, res) => {
  FacultyTicket.findByIdAndRemove(req.params.facultyTicketId)
    .then(facultyTicket => {
      if (!facultyTicket) {
        return res.status(404).send({
          message: "Faculty Ticket not found with id " + req.params.facultyTicketId
        });
      }
      res.send({ message: "Faculty Ticket deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Faculty Ticket not found with id " + req.params.facultyTicketId
        });
      }
      return res.status(500).send({
        message: "Could not delete faculty ticket with id " + req.params.facultyTicketId
      });
    });
};
