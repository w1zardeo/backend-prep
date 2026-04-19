import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { HttpExceptionFilter } from './../src/core/filters/http-exception.filter';

describe('Tasks (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('PATCH /tasks/:id should update a task', async () => {
    // 1. Create a task first
    const createRes = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Original Title', description: 'Original Desc' })
      .expect(201);

    const taskId = createRes.body.id;

    // 2. Update the task
    const updateRes = await request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .send({ title: 'Updated Title' })
      .expect(200);

    expect(updateRes.body.title).toBe('Updated Title');
    expect(updateRes.body.description).toBe('Original Desc'); // Should remain the same
  });

  it('PATCH /tasks/:id should return 404 for non-existent task', async () => {
    await request(app.getHttpServer())
      .patch('/tasks/non-existent-id')
      .send({ title: 'New Title' })
      .expect(404);
  });

  it('PATCH /tasks/:id should return 400 for invalid title', async () => {
    // 1. Create a task
    const createRes = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Task for validation', description: 'desc' })
      .expect(201);

    const taskId = createRes.body.id;

    // 2. Try to update with short title
    await request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .send({ title: 'ab' })
      .expect(400);
  });
});
