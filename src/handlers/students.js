// handlers - students.js
class StudentHttpHandler {
    constructor(studentController) {
      this.studentController = studentController;
    }
  
    async getAllStudents(req, res) {
      try {
        // Get processed data from controller
        const students = await this.studentController.getAll();
        
        // Format the response as needed
        res.json({ students });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = StudentHttpHandler;