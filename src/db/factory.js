// db - factory.js
const FakeService = require('./fake/service');

class DBFactory {
  static create(type, connectionString) {
    switch (type.toLowerCase()) {
      case 'fake':
        return new FakeService();
      default:
        return new FakeService();
    }
  }
}

module.exports = DBFactory;