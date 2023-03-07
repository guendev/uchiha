import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthorsService } from './authors.service'
import { Author } from './entities/author.entity'
import { CreateAuthorInput } from './dto/create-author.input'
import { ForbiddenError } from 'apollo-server-express'

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

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
}
