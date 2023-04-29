  // Solutions
  const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/helpdesk', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const solutionSchema = new mongoose.Schema({
    problem: String,
    description: String,
    solution: String,
    created_at: { type: Date, default: Date.now }
  });
  
  const Solution = mongoose.model('Solution', solutionSchema);

  // Create a new solution
app.post('/solutions', async (req, res) => {
    try {
      const solution = new Solution({
        problem: req.body.problem,
        description: req.body.description,
        solution: req.body.solution
      });
      await solution.save();
      res.status(201).json(solution);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Get all solutions
  app.get('/solutions', async (req, res) => {
    try {
      const solutions = await Solution.find();
      res.json(solutions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get a single solution by ID
  app.get('/solutions/:id', getSolution, (req, res) => {
    res.json(res.solution);
  });
  
  // Update a solution by ID
  app.patch('/solutions/:id', getSolution, async (req, res) => {
    if (req.body.problem != null) {
      res.solution.problem = req.body.problem;
    }
    if (req.body.description != null) {
      res.solution.description = req.body.description;
    }
    if (req.body.solution != null) {
      res.solution.solution = req.body.solution;
    }
    try {
      const updatedSolution = await res.solution.save();
      res.json(updatedSolution);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a solution by ID
  app.delete('/solutions/:id', getSolution, async (req, res) => {
    try {
      await res.solution.remove();
      res.json({ message: 'Solution deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Middleware function to get a single solution by ID
  async function getSolution(req, res, next) {
    let solution;
    try {
      solution = await Solution.findById(req.params.id);
      if (solution == null) {
        return res.status(404).json({ message: 'Solution not found' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.solution = solution;
    next();
  }

  module.exports = solutions;
