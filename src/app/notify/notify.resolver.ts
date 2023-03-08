import { Resolver, Subscription } from '@nestjs/graphql'
import { NotifyService } from './notify.service'
import { Notify } from './entities/notify.entity'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { PUB_SUB } from '~/apollo/pubsub.module'
import { Inject, UseGuards } from '@nestjs/common'
import { CreateNotifyInput } from '~/app/notify/dto/create-notify.input'
import ChanelEnum from '~/apollo/chanel.enum'
import { JWTAuthGuard } from '~/guards/jwt.guard'

@Resolver(() => Notify)
export class NotifyResolver {
  constructor(
    private readonly notifyService: NotifyService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub
  ) {}

  @Subscription(() => Notify, {
    filter: (payload: CreateNotifyInput, variables, context) => {
      return payload.notifyFired.user.id === context.connection.user.id
    }
  })
  @UseGuards(JWTAuthGuard)
  async notifyFired() {
    return this.pubSub.asyncIterator<CreateNotifyInput>(ChanelEnum.NOTIFY)
  }
}
