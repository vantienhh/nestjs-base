import { Module } from '@nestjs/common'
import { FirebaseService } from 'src/shared/firebase/firebase.service'
import { AuthenticateMiddleware } from 'src/shared/firebase/authenticate.middleware'

@Module({
  providers: [FirebaseService, AuthenticateMiddleware],
  exports: [FirebaseService, AuthenticateMiddleware]
})
export class FirebaseModule {}
