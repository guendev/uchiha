import { Injectable } from '@nestjs/common'
import { AnyKeys, FilterQuery, Model, UpdateQuery } from 'mongoose'
import { CoreDocument } from '@app/core/entities/core.entity'

@Injectable()
export class CoreService<T extends CoreDocument> {
  constructor(readonly model: Model<T>) {}

  async create(doc: AnyKeys<T>) {
    return this.model.create({
      ...doc,
      updatedAt: Date.now(),
      createdAt: Date.now()
    })
  }

  async find(filter: FilterQuery<T>) {
    return this.model.find(filter).sort({ createdAt: -1 })
  }
  async get(filter: FilterQuery<T>) {
    // Todo: upsert user
    return this.model.findOne(filter)
  }

  async update(filter: FilterQuery<T>, update: UpdateQuery<T>) {
    return this.model.findOneAndUpdate(filter, update, { new: true })
  }
}
