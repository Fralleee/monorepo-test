import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthController } from "./health.controller";
import { TrpcModule } from "./trpc/trpc.module";

@Module({
    imports: [ConfigModule.forRoot(), TrpcModule],
    controllers: [HealthController],
})
export class AppModule {}
