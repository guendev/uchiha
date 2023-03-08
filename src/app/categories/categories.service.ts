import { Injectable } from '@nestjs/common'
import { CoreService } from '@app/core'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Category, CategoryDocument } from './entities/category.entity'

@Injectable()
export class CategoriesService extends CoreService<CategoryDocument> {
  constructor(
    @InjectModel(Category.name) readonly userModel: Model<CategoryDocument>
  ) {
    super(userModel)
  }
}
