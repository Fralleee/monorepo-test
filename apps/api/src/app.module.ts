import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { TrpcModule } from './trpc/trpc.module'

@Module({
	imports: [TrpcModule],
	controllers: [HealthController],
})
export class AppModule {}
