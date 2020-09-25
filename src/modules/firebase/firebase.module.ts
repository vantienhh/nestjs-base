import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/firebase.service';
import { AuthenticateMiddleware } from 'src/modules/firebase/authenticate.middleware';

@Module({
  providers: [FirebaseService, AuthenticateMiddleware],
  exports: [FirebaseService, AuthenticateMiddleware]
})
export class FirebaseModule {}
