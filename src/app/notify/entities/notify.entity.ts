import { ObjectType, Field } from '@nestjs/graphql'
import { User } from '~/app/users/entities/user.entity'
import { idNotifyMiddleware } from '~/app/notify/middleware/id-notify.middleware'

@ObjectType()
export class Notify {
  @Field(() => String, { middleware: [idNotifyMiddleware] })
  id: string

  @Field(() => User)
  user: User

  @Field(() => String)
  message: string

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  success?: boolean
}
