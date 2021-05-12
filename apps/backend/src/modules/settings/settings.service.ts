import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import path from 'path';

@Injectable()
export class SettingsService {
  public constructor(private readonly configService: ConfigService) {}

  // eslint-disable-next-line class-methods-use-this
  public update(body: any) {
    if (body) {
      const text = JSON.stringify(body);

      fs.writeFileSync(path.resolve('../designer/build/settings.json'), text, { encoding: 'utf-8', flag: 'w' });
      fs.writeFileSync(path.resolve('../report/build/settings.json'), text, { encoding: 'utf-8', flag: 'w' });
    }
  }
}
