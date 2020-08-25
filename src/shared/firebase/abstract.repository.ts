import { firestore } from 'firebase-admin'
import { Id } from 'src/types'
import { NotFoundException, Injectable } from '@nestjs/common'
import { FirebaseService } from 'src/shared/firebase/firebase.service'
import CollectionReference = firestore.CollectionReference
import DocumentData = firestore.DocumentData
import WriteResult = firestore.WriteResult

@Injectable()
export abstract class AbstractRepository<T extends DocumentData = DocumentData> {
  constructor(protected readonly firebaseService: FirebaseService) {}

  abstract getCollection(): CollectionReference<T>

  /**
   * Lấy thông tin 1 bản ghi xác định bởi ID
   *
   * @param {string} id
   * @exception NotFoundException
   * @returns {Promise<T & Id>}
   */
  async findOrFail(id: string): Promise<T & Id> {
    const snapshot = await this.getCollection()
      .doc(id)
      .get()

    if (!snapshot.exists) {
      throw new NotFoundException()
    } else {
      return Object.assign(snapshot.data(), { id: snapshot.id })
    }
  }

  /**
   * TODO chưa làm
   * @returns {number}
   */
  async paginate() {
    const collectionRef = await this.getCollection().limit(5)
    return await collectionRef.get()
  }

  /**
   * Tạo 1 bản ghi
   *
   * @param {T} data
   * @param {true} notGetData   Có lấy data hay không
   * @returns {Promise<T & Id>}
   */
  async create(data: T): Promise<T & Id>
  async create(data: T, notGetData: true): Promise<void>
  async create(data: T, notGetData?: true): Promise<(T & Id) | void> {
    const cityRef = this.getCollection().doc()
    await cityRef.set(data)

    if (!notGetData) {
      return cityRef.get().then(city => city.data() && Object.assign(city.data(), { id: city.id }))
    }
  }

  /**
   * xóa 1 bản ghi theo id
   *
   * @param {string} id
   * @returns {Promise<WriteResult>}
   */
  delete(id: string): Promise<WriteResult> {
    return this.getCollection()
      .doc(id)
      .delete()
  }
}
