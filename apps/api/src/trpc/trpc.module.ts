import { Module, type NestModule, type MiddlewareConsumer } from '@nestjs/common'
import { TrpcMiddleware } from './trpc.middleware'

@Module({})
export class TrpcModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrpcMiddleware).forRoutes('/trpc/*path')
  }
}
