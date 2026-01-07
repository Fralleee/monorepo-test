import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from "@nestjs/common";
import { TrpcMiddleware } from "./trpc.middleware";

@Module({})
export class TrpcModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TrpcMiddleware).forRoutes({ path: "trpc/*", method: RequestMethod.ALL });
    }
}
