import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
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
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/movies', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer()).get('/movies').expect(200);
    });

    it('/add (POST)', () => {
      return request(app.getHttpServer())
        .post('/movies/add')
        .send({
          title: 'test',
          description: 'description',
          year: 2021,
          genres: ['serneg'],
        })
        .expect(201);
    });
  });

  describe('/movies/:id', () => {
    const id = 4;

    it('/ (GET)', () => {
      return request(app.getHttpServer()).get(`/movies/${id}`).expect(200);
    });

    it('/ (PATCH)', () => {
      return request(app.getHttpServer())
        .patch(`/movies/${id}`)
        .send({
          title: 'title4',
          description: 'description4',
          year: 3,
        })
        .expect(200);
    });

    it('/ (DELETE)', () => {
      return request(app.getHttpServer()).delete(`/movies/${id}`).expect(200);
    });
  });
});
