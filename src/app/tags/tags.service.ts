import { Injectable } from '@nestjs/common'
import { CoreService } from '@app/core'
import { Tag, TagDocument } from '~/app/tags/entities/tag.entity'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class TagsService extends CoreService<TagDocument> {
  constructor(@InjectModel(Tag.name) readonly model: Model<TagDocument>) {
    super(model)
  }
}
