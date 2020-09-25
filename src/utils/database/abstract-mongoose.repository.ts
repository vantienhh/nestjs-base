import { Injectable, NotFoundException } from '@nestjs/common';
import { Document, Model, CreateQuery } from 'mongoose';
import { IAbstractMongooseRepository } from 'src/types';

@Injectable()
export class AbstractMongooseRepository<T extends Document> implements IAbstractMongooseRepository<T> {
  private readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  getModel(): Model<T> {
    return this.model;
  }

  create(data: CreateQuery<T>): Promise<T>;
  create(data: CreateQuery<T>[]): Promise<T[]>;
  create(data: CreateQuery<T> | CreateQuery<T>[]): Promise<T | T[]> {
    // @ts-ignore
    return this.getModel().create(data);
  }

  findById(id: string | number): Promise<T | null> {
    return this.getModel().findById(id).exec();
  }

  async findOrFail(id: string | number, callback?: (err: any, res: T | null) => void): Promise<T> {
    const result = await this.getModel().findById(id, callback).exec();
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async destroy(id: string | number): Promise<boolean> {
    const result = await this.getModel().findByIdAndDelete(id).exec();
    if (result) {
      return true;
    }
    throw new NotFoundException();
  }
}
