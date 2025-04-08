// server.js
const express = require('express');
const studentRoutes = require('./src/routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use the student routes
app.use('/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the students endpoint at: http://localhost:${PORT}/students`);
});