import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'
import { v4 as uuidv4 } from 'uuid'

export const idNotifyMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn
) => {
  const value = await next()
  // random Id
  return value || uuidv4()
}
