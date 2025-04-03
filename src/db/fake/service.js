const DBService = require('../dbService');

class FakeService extends DBService {
  constructor() {
    super();
    this.students = new Map();
    // Initialize with 5 dummy students
    const dummystudents = [
      { matricula: '1', name: 'John Doe', calificacionFinal: '50', dineroDebe: '0' },
      { matricula: '2', name: 'Jane Smith', calificacionFinal: '85', dineroDebe: '0' },
      { matricula: '3', name: 'Bob Johnson', calificacionFinal: '100', dineroDebe: '50000'},
      { matricula: '4', name: 'Alice Brown', calificacionFinal: '35', dineroDebe: '14000' },
      { matricula: '5', name: 'Charlie Wilson', calificacionFinal: '70', dineroDebe: '0' },
    ];

    dummystudents.forEach((customer) => {
      this.students.set(customer.id, customer);
    });
  }

  async getAllstudents() {
    return Array.from(this.students.values());
  }

}

module.exports = FakeService;
