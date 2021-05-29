import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { AppModule } from '../src/app.module';
import { productCreateRequestSuccess } from './mocks/product-create-request-success.mock';

describe('Product Create (e2e)', () => {
  let app;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DSN, { useNewUrlParser: true });
    await mongoose.connection.dropDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products/ (POST) - should create a valid product', (done) => {
    return request(app.getHttpServer())
      .post('/products/')
      .send(productCreateRequestSuccess)
      .expect(201)
      .end(done);
  });

  it('/products (POST) - should not create a product for empty body', (done) => {
    return request(app.getHttpServer())
      .post('/products')
      .send()
      .expect(404)
      .expect({
        message: 'get_all_product_not_found',
        data: null,
        errors: null,
      })
      .end(done);
  });
});
