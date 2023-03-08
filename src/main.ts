import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config'
import { exec } from 'child_process'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(cookieParser())

  const configService = app.get(ConfigService)
  await app.listen(configService.get<string>('PORT'))

  // log the endpoint
  console.log(`🔥http://localhost:${configService.get<string>('PORT')}`)

  await commitApollo()
}
bootstrap()

const commitApollo = async () => {
  console.log('Comitting Apollo schema...')
  try {
    exec('npm run apollo:build && npm run apollo:commit')
    console.log('Committed Apollo schema')
  } catch (e) {
    console.log('Error committing Apollo schema', e)
  }
}
