import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesResolver } from './categories.resolver'
import { CategoriesController } from './categories.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategoryEntity } from './entities/category.entity'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: () => {
          const schema = CategoryEntity
          schema.plugin(require('mongoose-slug-generator'))
          return schema
        }
      }
    ])
  ],
  providers: [CategoriesResolver, CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
