import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🌿 Plant Tracker Local Server Runnings';
  }
}
