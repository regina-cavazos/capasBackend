// controllers - students.js
class StudentController {
    constructor(service) {
      this.service = service;
    }
    
    async getAll() {
      // Get raw data from service
      const rawStudents = await this.service.getAllStudents();
      
      // Apply business logic - determine status for each student
      const processedStudents = rawStudents.map(student => {
        const isApproved = student.calificacionFinal >= 60;
        const hasDebt = student.dineroDebe > 0;
        
        let status;
        if (isApproved && !hasDebt) {
          status = "aprobado";
        } else if (!isApproved && !hasDebt) {
          status = "pendiente";
        } else if (isApproved && hasDebt) {
          status = "reestructura";
        } else {
          status = "expulsado";
        }
        
        // Return processed data in the format needed by the API
        return {
          Matricula: student.matricula,
          Nombres: student.name,
          Estatus: status
        };
      });
      
      return processedStudents;
    }
  }
  
  module.exports = StudentController;