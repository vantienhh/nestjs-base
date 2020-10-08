import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthenticateMiddleware } from 'src/modules/firebase/authenticate.middleware';
import { CityModule } from 'src/modules/location/city/city.module';

@Module({
  imports: [CityModule]
})
export class LocationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticateMiddleware).forRoutes('*');
  }
}
