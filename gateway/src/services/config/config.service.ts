import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.activityService = {
      options: {
        port: process.env.ACTIVITY_SERVICE_PORT,
        host: process.env.ACTIVITY_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.productService = {
      options: {
        port: process.env.PRODUCT_SERVICE_PORT,
        host: process.env.PRODUCT_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.orderService = {
      options: {
        port: process.env.ORDER_SERVICE_PORT,
        host: process.env.ORDER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
