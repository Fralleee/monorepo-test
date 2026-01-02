import { Module } from '@nestjs/common'
import { HealthController } from './health.controller.js'
import { TrpcModule } from './trpc/trpc.module.js'

@Module({
  imports: [TrpcModule],
  controllers: [HealthController],
})
export class AppModule {}
