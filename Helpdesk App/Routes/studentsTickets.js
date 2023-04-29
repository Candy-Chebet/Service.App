
//Student Tickets Component
//database connection using the MongoDB driver


MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log('Database connected!');
  const db = client.db('helpdesk');

  //route to handle GET requests for reading student tickets
  app.get('/student-tickets', (req, res) => {
    db.collection('student-tickets').find().toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  //a route to handle PUT requests for updating student tickets
  app.put('/student-tickets/:id', (req, res) => {
    const { name, problem, description, priorityLevel, onOffCampus } = req.body;
    const ticket = {
      name,
      problem,
      description,
      priorityLevel,
      onOffCampus,
    };
    const id = req.params.id;
    db.collection('student-tickets').updateOne(
      { _id: ObjectId(id) },
      { $set: ticket },
      (err, result) => {
        if (err) throw err;
        res.send('Ticket updated successfully!');
      }
    );
  });

  // a route to handle DELETE requests for deleting student tickets

  app.delete('/student-tickets/:id', (req, res) => {
    const id = req.params.id;
    db.collection('student-tickets').deleteOne({ _id: ObjectId(id) }, (err, result) => {
      if (err) throw err;
      res.send('Ticket deleted successfully!');
    });
  });

  
  // Close the database connection when the server stops
  process.on('SIGINT', () => {
    console.log('Closing the database connection...');
    client.close();
    process.exit();
  });
});
module.exports = StudentTicket;
