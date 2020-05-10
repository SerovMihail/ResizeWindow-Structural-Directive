import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfig } from './models/IConfig';
import { DeviceDetectionService, DeviceDetectionConfigService } from './services/device-detection.service';
import { ViewportSizeDirective } from './directives/viewport-size.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ViewportSizeDirective],
  exports: [ViewportSizeDirective]
})
export class DeviceDetectionModule {

  static forRoot(config: IConfig): ModuleWithProviders {
    return {
      ngModule: DeviceDetectionModule,
      providers: [
        DeviceDetectionService,
        {
          provide: DeviceDetectionConfigService,
          useValue: config
        },
         { provide: Window , useValue: window }
      ]
    }
  }
}
