import { Model, Document, CreateQuery } from 'mongoose';

export type Id = {
  id: string;
};

export interface IResponse<T> {
  statusCode: number;
  message: string;
  data: T | T[];
}

export interface RedisOptions {
  /**
   * IP address of the Redis server.
   * @default 127.0.0.1
   */
  host?: string;
  /**
   * Port of the Redis server.
   * @default 6379
   */
  port?: number;

  /**
   * If set, client will send AUTH command with the value of this option when connected.
   */
  password?: string;

  /**
   * Database index to use.
   */
  db?: number;
}

export interface IAbstractMongooseRepository<T extends Document> {
  getModel(): Model<T>;

  /**
   * saving one or more documents to the database
   * @param {CreateQuery<T>} data
   *
   * @returns {Promise<T>}
   */
  create(data: CreateQuery<T>): Promise<T>;
  create(data: CreateQuery<T>[]): Promise<T[]>;
  create(data: CreateQuery<T> | CreateQuery<T>[]): Promise<T | T[]>;

  /**
   * find a single document by its id field
   * @param {string | number} id
   *
   * @returns {Promise<T | null>}
   */
  findById(id: string | number): Promise<T | null>;

  /**
   * find a single document by its id field. If not, then fail
   *
   * @param {string | number} id
   * @param {(err: any, res: (T | null)) => void} callback
   *
   * @throws NotFoundException
   * @returns {Promise<T>}
   */
  findOrFail(id: string | number, callback?: (err: any, res: T | null) => void): Promise<T>;

  /**
   * Finds a matching document, removes it. If not, then fail
   *
   * @param {string | number} id
   *
   * @throws NotFoundException
   * @returns {Promise<boolean>}
   */
  destroy(id: string | number): Promise<boolean>;
}
