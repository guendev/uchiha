import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { AuthorsService } from './authors.service'
import { Author, AuthorDocument } from './entities/author.entity'
import { CreateAuthorInput } from './dto/create-author.input'
import { ForbiddenError } from 'apollo-server-express'
import { UpdateAuthorInput } from '~/app/authors/dto/update-author.input'
import { InputValidator } from '~/shared/validator/input.validator'
import { Inject, UseGuards } from '@nestjs/common'
import { JWTAuthGuard } from '~/guards/jwt.guard'
import { FilterQuery } from 'mongoose'
import { GetAuthorsFilter } from '~/app/authors/filter/get-authors.filter'
import { PUB_SUB } from '~/apollo/pubsub.module'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { toMongoObjectIds } from '~/shared/validator/objectid.validator'
import { NotFoundError } from '~/shared/errors/not-found.error'
import ChanelEnum from '~/apollo/chanel.enum'
import { CreateNotifyInput } from '~/app/notify/dto/create-notify.input'
import { CurrentUser } from '~/decorators/user.decorator'

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub
  ) {}

  @Mutation(() => Author)
  async createAuthor(@Args('input') input: CreateAuthorInput) {
    // find author by name
    const author = await this.authorsService.get({
      name: {
        $regex: new RegExp(input.name, 'i')
      }
    })
    if (author) {
      throw new ForbiddenError('Author already exists')
    }

    return this.authorsService.create(input)
  }

  @Query(() => [Author], { name: 'authors' })
  @UseGuards(JWTAuthGuard)
  async getAuthors(
    @Args('filter', new InputValidator()) filter: GetAuthorsFilter
  ) {
    // create filter by regex name
    const _filter: FilterQuery<AuthorDocument> = {}
    if (filter.name) {
      _filter.name = {
        $regex: new RegExp(`^${filter.name}$`, 'i')
      }
    }
    return this.authorsService.find(_filter, filter)
  }

  @Mutation(() => Author)
  @UseGuards(JWTAuthGuard)
  async updateAuthor(
    @Args('input', new InputValidator()) input: UpdateAuthorInput,
    @CurrentUser() user
  ) {
    // find _author by id
    const _author = await this.authorsService.get({
      _id: toMongoObjectIds(input.id)
    })
    if (!_author) {
      throw new NotFoundError('Author not found')
    }
    await this.pubSub.publish<CreateNotifyInput>(ChanelEnum.NOTIFY, {
      notifyFired: {
        user,
        message: `Author ${_author.name} was updated`
      }
    })
    delete input.id
    return this.authorsService.update({ _id: _author._id }, input)
  }
}
