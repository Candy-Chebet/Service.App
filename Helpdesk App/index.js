const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const app = express();
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const solutionRoute = require('./Routes/solutions')
const studentRoute = require('./Routes/studentsTickets')
const facultyRoute = require('./Routes/facultyTickets')
const evaluationRoute = require('./Routes/Evaluations')

app.use('/evaluation', evaluationRoute);
app.use('/faculty', facultyRoute);
app.use('/solution', solutionRoute);
app.use('/student', studentRoute);



app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
