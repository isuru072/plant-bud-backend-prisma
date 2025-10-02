import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GeminiService } from './gemini/gemini.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly geminiService: GeminiService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hey_buddy')
  async heyBuddy(
    @Query('title') title: string,
    @Query('plantedDate') plantedDate: string,
  ) {
    try {
      const geminiResult = await this.geminiService.generatePlantInsights(
        title,
        plantedDate,
      );
      return { success: true, geminiResult };
    } catch (error: any) {
      return { success: false, error: error?.message ?? 'Unknown error' };
    }
  }
}
