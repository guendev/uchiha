import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'
import { Types } from 'mongoose'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY, IS_TEST_USER_KEY } from "../decorators/public.decorator";

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JWTAuthGuard.name)
  constructor(private reflector: Reflector) {
    super()
  }
  getRequest(context: ExecutionContext) {
    // dù là request thường đều có thể tạo graphql context
    const req: Request = GqlExecutionContext.create(context).getContext().req
    if (req.cookies && req.cookies._token) {
      req.headers.authorization = 'Bearer ' + req.cookies._token
    }
    return req
  }

  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    if (user) return user

    const isTestUser = this.reflector.getAllAndOverride<boolean>(
      IS_TEST_USER_KEY,
      [context.getHandler(), context.getClass()]
    )
    if (isTestUser) {
      this.logger.debug('Fallback test user: ' + 'awagmJPhJuNuodV99vO3mVXDDMH3')
      return {
        uid: 'awagmJPhJuNuodV99vO3mVXDDMH3',
        _id: new Types.ObjectId('62c798b92baae3f41f41dde3')
      }
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return user
    }
    return super.handleRequest(err, user, info, context, status)
  }
}
