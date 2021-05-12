import { Controller, Body, Post } from '@nestjs/common';
import { ControllerPrefix } from 'decorators';
import { SettingsService } from './settings.service';

@ControllerPrefix('api')
@Controller('settings')
export class SettingsController {
  public constructor(private readonly settingsService: SettingsService) {}

  @Post('update')
  public update(@Body() body: any) {
    return this.settingsService.update(body);
  }
}
