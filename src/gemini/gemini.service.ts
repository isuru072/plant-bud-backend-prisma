import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {
  constructor(private readonly configService: ConfigService) {}

  async generatePlantInsights(plantTitle: string, plantedDate: string): Promise<string | null> {
    const apiKey = this.configService.get<string>('GOOGLE_APIKEY');

    if (!apiKey) {
      // eslint-disable-next-line no-console
      console.error('GOOGLE_APIKEY is not set');
      return null;
    }

    const prompt =
      'I have a plant called ' +
      plantTitle +
      ', planted on ' +
      plantedDate +
      '. Please provide: \n 1. A recommended watering schedule. \n 2. Sub-variations of this plant. \n 3. Common diseases affecting it.\n 4. Countries where this plant is commonly found.';

    const ai = new GoogleGenAI({ apiKey });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = (response as any)?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      return text;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('❌ Gemini API Error:', error);
      return null;
    }
  }
}


