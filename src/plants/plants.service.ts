import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

@Injectable()
export class PlantsService {
  constructor(private prisma: PrismaService) {}

  async getAllPlants() {
    const client = this.prisma as any;
    return client.plant.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async importFromAssets() {
    const filePath = path.join(process.cwd(), 'assets', 'plants.json');
    const file = await fs.readFile(filePath, 'utf-8');
    const items = JSON.parse(file) as Array<{
      name: string;
      scientificName?: string;
      nextWatering?: string;
      token?: string;
      imageUrl?: string;
    }>;

    const client = this.prisma as any;
    const results = [] as any[];
    for (const p of items) {
      const upserted = await client.plant.upsert({
        where: { name: p.name },
        update: {
          scientificName: p.scientificName ?? null,
          nextWatering: p.nextWatering ? new Date(p.nextWatering) : null,
          token: p.token ?? null,
          imageUrl: p.imageUrl ?? null,
        },
        create: {
          name: p.name,
          scientificName: p.scientificName ?? null,
          nextWatering: p.nextWatering ? new Date(p.nextWatering) : null,
          token: p.token ?? null,
          imageUrl: p.imageUrl ?? null,
        },
      });
      results.push(upserted);
    }
    return { count: results.length };
  }
}
