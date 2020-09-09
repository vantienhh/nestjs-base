import { Injectable, NestMiddleware } from '@nestjs/common'

// import {adminFirebase} from 'src/firebase/fireStore'

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): any {
    console.log('AuthenticateMiddleware')
    // const authorization = req.headers['authorization']
    //
    // if (!authorization || !authorization.includes('Bearer ')) {
    //   return res.status(401).json({error: 'Authorization'})
    // }
    //
    // const token = authorization.split(' ')[1]
    //
    // adminFirebase.auth()
    //              .verifyIdToken(token)
    //              .then(function (decodedToken) {
    //
    //                return next()
    //              })
    //              .catch(function (error) {
    //                return res.status(401).json({error: 'Authorization'})
    //              })
    next()
  }
}
