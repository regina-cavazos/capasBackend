// db - dbService.js
class DBService {
    constructor() {
      this.initialized = false;
    }
  
    async getAllStudents() {
      if (!this.initialized) {
        throw new Error('Service not initialized');
      }
      throw new Error('Method not implemented');
    }
  }
  
  module.exports = DBService;