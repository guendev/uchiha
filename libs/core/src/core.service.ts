import { Injectable } from '@nestjs/common'
import { AnyKeys, FilterQuery, Model, SortOrder, UpdateQuery } from 'mongoose'
import { CoreDocument } from '@app/core/entities/core.entity'
import { PaginationFilter } from '~/shared/dto/pagination.filter'

@Injectable()
export class CoreService<T extends CoreDocument> {
  constructor(readonly model: Model<T>) {}

  async create(doc: AnyKeys<T>): Promise<T> {
    return this.model.create({
      ...doc,
      updatedAt: Date.now(),
      createdAt: Date.now()
    })
  }

  async find(): Promise<T[]>
  async find(filter: FilterQuery<T>): Promise<T[]>
  async find(filter: FilterQuery<T>, options: PaginationFilter): Promise<T[]>

  async find(
    filter?: FilterQuery<T>,
    options?: PaginationFilter
  ): Promise<T[]> {
    const query = filter ? { ...filter } : {}
    const sort = options?.toMongoSort || PaginationFilter.defaultSort
    const queryBuilder = this.model.find(query).sort(sort)

    if (!options) {
      return queryBuilder.exec()
    }
    const { offset, limit } = options

    return queryBuilder.skip(offset).limit(limit).exec()
  }

  async get(filter: FilterQuery<T>) {
    // Todo: upsert user
    return this.model.findOne(filter)
  }

  async update(filter: FilterQuery<T>, update: UpdateQuery<T>) {
    return this.model.findOneAndUpdate(filter, update, { new: true })
  }

  async remove(filter: FilterQuery<T>) {
    return this.model.findOneAndDelete(filter)
  }
}
