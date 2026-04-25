import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Tasks (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Get a token for authorized requests
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    accessToken = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /tasks should return 401 Unauthorized without token', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(401);
  });

  it('PATCH /tasks/:id/status should update task status', async () => {
    const uniqueTitle = `Status Test ${Date.now()}`;
    // 1. Create a task
    const createRes = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: uniqueTitle, description: 'desc', userId: 1 })
      .expect(201);

    const taskId = createRes.body.id;

    // 2. Update status
    const updateRes = await request(app.getHttpServer())
      .patch(`/tasks/${taskId}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'IN_PROGRESS' })
      .expect(200);

    expect(updateRes.body.status).toBe('IN_PROGRESS');
  });

  it('GET /tasks?status=COMPLETED should filter tasks', async () => {
    const title1 = `Completed Task ${Date.now()}`;
    const title2 = `Open Task ${Date.now()}`;

    // 1. Create one task and mark as COMPLETED
    const t1 = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: title1, description: 'desc', userId: 1 })
      .expect(201);
    
    await request(app.getHttpServer())
      .patch(`/tasks/${t1.body.id}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'COMPLETED' })
      .expect(200);

    // 2. Create another task (OPEN by default)
    await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: title2, description: 'desc', userId: 1 })
      .expect(201);

    // 3. Filter by COMPLETED
    const filterRes = await request(app.getHttpServer())
      .get('/tasks')
      .query({ status: 'COMPLETED' })
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    // Check if items contain only COMPLETED tasks
    expect(filterRes.body.items.every(t => t.status === 'COMPLETED')).toBe(true);
    // At least the one we created should be there
    const found = filterRes.body.items.find(t => t.id === t1.body.id);
    expect(found).toBeDefined();
    expect(found.status).toBe('COMPLETED');
  });
});
