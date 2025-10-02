import { Controller, Get, Post } from '@nestjs/common';
import { PlantsService } from './plants.service';

@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}

  @Get()
  async findAll() {
    return this.plantsService.getAllPlants();
  }

  @Post('import')
  async import() {
    return this.plantsService.importFromAssets();
  }
}
