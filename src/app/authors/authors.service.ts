import { Injectable } from '@nestjs/common'
import { CoreService } from '@app/core'
import { Author, AuthorDocument } from './entities/author.entity'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class AuthorsService extends CoreService<AuthorDocument> {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>
  ) {
    super(authorModel)
  }
}
