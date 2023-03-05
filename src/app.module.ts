import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './app/users/users.module'
import { AuthModule } from './app/auth/auth.module'
import { ApolloModule } from './apollo/apollo.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApolloModule,
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production'
    // }),
    DatabaseModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
