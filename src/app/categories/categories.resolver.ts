import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Category, CategoryDocument } from './entities/category.entity'
import { CategoriesService } from './categories.service'
import { JWTAuthGuard } from '~/guards/jwt.guard'
import { Inject, UseGuards } from '@nestjs/common'
import { CreateCategoryInput } from './dto/create-category.input'
import { InputValidator } from '~/shared/validator/input.validator'
import { ForbiddenError } from 'apollo-server-express'
import { UpdateCategoryInput } from '~/app/categories/dto/update-category.input'
import { toMongoObjectIds } from '~/shared/validator/objectid.validator'
import { NotFoundError } from '~/shared/errors/not-found.error'
import { RemoveCategoryInput } from '~/app/categories/dto/remove-category.input'
import { GetCategoriesFilter } from '~/app/categories/filter/get-categories.filter'
import { FilterQuery } from 'mongoose'
import { PUB_SUB } from '~/apollo/pubsub.module'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { CurrentUser } from '~/decorators/user.decorator'
import ChanelEnum from '~/apollo/chanel.enum'
import { CreateNotifyInput } from '~/app/notify/dto/create-notify.input'

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub
  ) {}

  // create, update, delete, etc.
  @Mutation(() => Category)
  @UseGuards(JWTAuthGuard)
  async createCategory(
    @Args('input', new InputValidator()) input: CreateCategoryInput
  ) {
    const _tag = await this.categoriesService.get({
      name: {
        $regex: new RegExp(`^${input.name}$`, 'i')
      }
    })
    if (_tag) {
      throw new ForbiddenError('Category already exists')
    }
    return this.categoriesService.create(input)
  }

  @Query(() => [Category], { name: 'categories' })
  @UseGuards(JWTAuthGuard)
  async getCategories(
    @Args('filter', new InputValidator()) filter: GetCategoriesFilter
  ) {
    // create filter by regex name
    const _filter: FilterQuery<CategoryDocument> = {}
    if (filter.name) {
      _filter.name = {
        $regex: new RegExp(`^${filter.name}$`, 'i')
      }
    }
    return this.categoriesService.find(_filter, filter)
  }

  @Mutation(() => Category)
  @UseGuards(JWTAuthGuard)
  async updateCategory(
    @Args('input', new InputValidator()) input: UpdateCategoryInput,
    @CurrentUser() user
  ) {
    const _category = await this.categoriesService.get({
      _id: toMongoObjectIds(input.id)
    })
    if (!_category) {
      throw new NotFoundError('Category not found')
    }
    delete input.id
    await this.pubSub.publish<CreateNotifyInput>(ChanelEnum.NOTIFY, {
      notifyFired: {
        user,
        message: `Category ${_category.name} was updated`
      }
    })
    return this.categoriesService.update({ _id: _category._id }, input)
  }

  @Mutation(() => Category)
  @UseGuards(JWTAuthGuard)
  async removeCategory(
    @Args('input', new InputValidator()) input: RemoveCategoryInput
  ) {
    const _category = await this.categoriesService.get({
      _id: toMongoObjectIds(input.id)
    })
    if (!_category) {
      throw new NotFoundError('Category not found')
    }
    return this.categoriesService.remove({ _id: _category._id })
  }
}
