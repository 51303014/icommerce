import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { AppModule } from '../src/app.module';

describe('products search (e2e)', () => {
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
    app.init();
  });

  it('/products/ (GET) - should return an product sucessfully', (done) => {
    return request(app.getHttpServer())
      .get('/products/search')
      .send()
      .expect(200)
      .expect({
        message: 'product_search_success',
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

  it('/products/search - should fail with product not found', (done) => {
    return request(app.getHttpServer())
      .get('/products/search')
      .send()
      .expect(404)
      .expect({
        message: 'product_search_not_found',
        data: null,
        errors: null,
      })
      .end(done);
  });
});
