import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { ExampleMiddleware } from './middleware/example.middleware'
import { FirebaseModule } from 'src/modules/firebase/firebase.module'
import { CityController } from 'src/modules/location/controllers/city.controller'
import { CityRepository } from 'src/modules/location/Repository/city.repository'
import { CityService } from 'src/modules/location/services/city.service'
import { AuthenticateMiddleware } from 'src/modules/firebase/authenticate.middleware'

@Module({
  imports: [FirebaseModule],
  controllers: [CityController],
  providers: [CityRepository, CityService]
})
export class LocationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticateMiddleware).forRoutes('*')

    consumer.apply(ExampleMiddleware).forRoutes({ path: 'examples', method: RequestMethod.POST })
  }
}
