 const StudentController = require('../controllers/students');

describe('StudentController', () => {
  let mockService;
  let controller;

  beforeEach(() => {
    mockService = {
      getAllStudents: jest.fn()
    };
    controller = new StudentController(mockService);
  });

  test('should get all students and calculate their status', async () => {
    // Mock the raw data from the service
    const rawStudents = [
      { matricula: '1', name: 'John Doe', calificacionFinal: 50, dineroDebe: 0 },
      { matricula: '2', name: 'Jane Smith', calificacionFinal: 85, dineroDebe: 0 },
      { matricula: '3', name: 'Bob Johnson', calificacionFinal: 100, dineroDebe: 50000 },
      { matricula: '4', name: 'Alice Brown', calificacionFinal: 35, dineroDebe: 14000 },
      { matricula: '5', name: 'Charlie Wilson', calificacionFinal: 70, dineroDebe: 0 }
    ];
    
    mockService.getAllStudents.mockResolvedValue(rawStudents);

    // Expected processed results
    const expectedStudents = [
      { Matricula: '1', Nombres: 'John Doe', Estatus: 'pendiente' },
      { Matricula: '2', Nombres: 'Jane Smith', Estatus: 'aprobado' },
      { Matricula: '3', Nombres: 'Bob Johnson', Estatus: 'reestructura' },
      { Matricula: '4', Nombres: 'Alice Brown', Estatus: 'expulsado' },
      { Matricula: '5', Nombres: 'Charlie Wilson', Estatus: 'aprobado' }
    ];

    const result = await controller.getAll();
    
    // Check that the service was called
    expect(mockService.getAllStudents).toHaveBeenCalledTimes(1);
    
    // Check that the business logic properly transformed the data
    expect(result).toEqual(expectedStudents);
  });

  test('should correctly determine pendiente status', async () => {
    // Student who failed but has no debt
    mockService.getAllStudents.mockResolvedValue([
      { matricula: '1', name: 'John Doe', calificacionFinal: 50, dineroDebe: 0 }
    ]);

    const result = await controller.getAll();
    expect(result[0].Estatus).toBe('pendiente');
  });

  test('should correctly determine aprobado status', async () => {
    // Student who passed and has no debt
    mockService.getAllStudents.mockResolvedValue([
      { matricula: '2', name: 'Jane Smith', calificacionFinal: 85, dineroDebe: 0 }
    ]);

    const result = await controller.getAll();
    expect(result[0].Estatus).toBe('aprobado');
  });

  test('should correctly determine reestructura status', async () => {
    // Student who passed but has debt
    mockService.getAllStudents.mockResolvedValue([
      { matricula: '3', name: 'Bob Johnson', calificacionFinal: 100, dineroDebe: 50000 }
    ]);

    const result = await controller.getAll();
    expect(result[0].Estatus).toBe('reestructura');
  });

  test('should correctly determine expulsado status', async () => {
    // Student who failed and has debt
    mockService.getAllStudents.mockResolvedValue([
      { matricula: '4', name: 'Alice Brown', calificacionFinal: 35, dineroDebe: 14000 }
    ]);

    const result = await controller.getAll();
    expect(result[0].Estatus).toBe('expulsado');
  });
});