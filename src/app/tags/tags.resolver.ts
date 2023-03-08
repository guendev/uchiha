import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { TagsService } from './tags.service'
import { Tag } from './entities/tag.entity'
import { CreateTagInput } from './dto/create-tag.input'
import { InputValidator } from '~/shared/validator/input.validator'
import { UseGuards } from '@nestjs/common'
import { JWTAuthGuard } from '~/guards/jwt.guard'
import { ForbiddenError } from 'apollo-server-express'

@Resolver(() => Tag)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Mutation(() => Tag)
  @UseGuards(JWTAuthGuard)
  async createTag(@Args('input', new InputValidator()) input: CreateTagInput) {
    // use regex to find if tag already exists by name
    const _tag = await this.tagsService.get({
      name: {
        $regex: new RegExp(`^${input.name}$`, 'i')
      }
    })
    if (_tag) {
      throw new ForbiddenError('Tag already exists')
    }
    return this.tagsService.create(input)
  }
}
