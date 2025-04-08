const request = require('supertest');
const express = require('express');
const StudentHttpHandler = require('../handlers/students');

jest.mock('../controllers/students');

describe('StudentHttpHandler', () => {
  let app;
  let mockController;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockController = {
      getAll: jest.fn()
    };

    const httpHandler = new StudentHttpHandler(mockController);

    // Set up the route
    app.get('/students', httpHandler.getAllStudents.bind(httpHandler));
  });

  describe('GET /students', () => {
    it('should return all students with their status', async () => {
      const students = [
        { Matricula: '1', Nombres: 'John Doe', Estatus: 'pendiente' },
        { Matricula: '2', Nombres: 'Jane Smith', Estatus: 'aprobado' },
        { Matricula: '3', Nombres: 'Bob Johnson', Estatus: 'reestructura' },
        { Matricula: '4', Nombres: 'Alice Brown', Estatus: 'expulsado' }
      ];
      mockController.getAll.mockResolvedValue(students);

      const response = await request(app)
        .get('/students')
        .expect(200);

      expect(response.body).toEqual({ students });
      expect(mockController.getAll).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      mockController.getAll.mockRejectedValue(new Error('Database error'));

      await request(app)
        .get('/students')
        .expect(500)
        .expect(res => {
          expect(res.body.error).toBe('Database error');
        });
    });
  });
});