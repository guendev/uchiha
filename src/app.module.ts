import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { DevtoolsModule } from '@nestjs/devtools-integration'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production'
    }),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
