import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PlantsModule } from './plants/plants.module';
import { PrismaModule } from './prisma/prisma.module';
import { GeminiService } from './gemini/gemini.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PlantsModule,
  ],
  controllers: [AppController],
  providers: [AppService, GeminiService],
})
export class AppModule {}
