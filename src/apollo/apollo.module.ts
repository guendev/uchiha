import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AuthModule } from '~/app/auth/auth.module'
import { AuthService } from '~/app/auth/auth.service'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [AuthService],
      useFactory: () => ({
        playground: false,
        autoSchemaFile: true,
        sortSchema: true,
        debug: true,
        cors: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        subscriptions: {
          'graphql-ws': {
            onConnect: async (context: any) => {
              const { connectionParams, extra } = context
              extra.token = connectionParams?.Authorization || ''
            }
          },
          context: ({ extra }) => {
            return {
              connection: {
                headers: {
                  authorization: extra.token
                }
              }
            }
          }
        }
      })
    })
  ]
})
export class ApolloModule {}
