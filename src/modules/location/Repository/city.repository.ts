import { Injectable } from '@nestjs/common'
import { firestore } from 'firebase-admin'
import { AbstractRepository } from 'src/modules/firebase/abstract.repository'
import { CitySave } from 'src/modules/location/interfaces/city.interface'
import CollectionReference = firestore.CollectionReference

@Injectable()
export class CityRepository extends AbstractRepository<CitySave> {
  getCollection(): CollectionReference<CitySave> {
    return this.firebaseService.fireStore().collection('cities') as CollectionReference<CitySave>
  }

}
