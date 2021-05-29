import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { AppModule } from '../src/app.module';
import {
  orderCreateRequestFailed,
  orderCreateRequestSuccess,
} from './mocks/order-create-request-success.mock';

describe('Orders (e2e)', () => {
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

  it('/Orders (POST) - should not create a order with bad request', (done) => {
    return request(app.getHttpServer())
      .post('/order')
      .expect(401)
      .expect({
        message: 'order_bad_request',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/Orders (POST) - should not create a order with an invalid customer', (done) => {
    return request(app.getHttpServer())
      .post('/orders')
      .send(orderCreateRequestFailed)
      .expect(404)
      .expect({
        message: 'order_create_not_found',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/Orders (POST) - should create a order for the product with a valid order', (done) => {
    return request(app.getHttpServer())
      .post('/orders')
      .send(orderCreateRequestSuccess)
      .expect(201)
      .expect((res) => {
        res.body.data.order.id = 'fake_value';
        res.body.data.order.created_at = 'fake_value';
        res.body.data.order.updated_at = 'fake_value';
      })
      .expect({
        message: 'order_create_success',
        data: {
          order: {
            customerId: '60b10e000c4e060042d840fb',
            orderStatus: 'PENDING',
            createdAt: '2021-05-28T15:36:33.120Z',
            updatedAt: '2021-05-28T15:36:33.120Z',
            id: '60b10e010c4e060042d840fc',
          },
        },
        errors: null,
      })
      .end(done);
  });
});
