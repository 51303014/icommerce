import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
describe('Users Sign Up (e2e)', () => {
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

  it('/products/filter (GET) - should return an product success', (done) => {
    return request(app.getHttpServer())
      .get('/products/filter')
      .send()
      .expect(200)
      .expect({
        message: 'filter_product_success',
        data: [
          {
            name: 'Alphabounce',
            branch: 'Adidas',
            color: 'Blue',
            quantity: '1',
            price: 500,
            id: '5d987c3bfb881ec86b476bcc',
          },
        ],
        errors: null,
      })
      .end(done);
  });

  it('/products/filter (GET) - should fail with product not found', (done) => {
    return request(app.getHttpServer())
      .get('/products/filter')
      .send()
      .expect(404)
      .expect({
        message: 'product_filter_not_found',
        data: null,
        errors: null,
      })
      .end(done);
  });
});
