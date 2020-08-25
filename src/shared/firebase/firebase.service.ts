import * as admin from 'firebase-admin'
import { Injectable } from '@nestjs/common'
import Firestore = admin.firestore.Firestore

@Injectable()
export class FirebaseService {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: process.env.FIREBASE_DATABASEURL
      })
    }
  }

  fireStore(): Firestore {
    return admin.firestore()
  }
}
