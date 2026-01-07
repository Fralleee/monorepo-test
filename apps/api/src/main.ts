import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for local development
    app.enableCors({
        origin: ["http://localhost:3000", "http://localhost:3001", process.env.CORS_ORIGIN].filter(Boolean) as string[],
        credentials: true,
    });

    const port = process.env.PORT ?? 4000;
    await app.listen(port);

    console.log(`🚀 API server running on http://localhost:${port}`);
    console.log(`📡 tRPC endpoint: http://localhost:${port}/trpc`);
}

bootstrap();
