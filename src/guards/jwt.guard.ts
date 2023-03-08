import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Types } from 'mongoose'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY, IS_TEST_USER_KEY } from '~/decorators/public.decorator'

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JWTAuthGuard.name)
  constructor() {
    super()
  }
  getRequest(context: ExecutionContext) {
    const { req, connection } = GqlExecutionContext.create(context).getContext()
    if (connection) {
      return connection
    }
    if (req.cookies && req.cookies._token) {
      req.headers.authorization = 'Bearer ' + req.cookies._token
    }
    return req
  }

  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    return super.handleRequest(err, user, info, context, status)
  }
}
