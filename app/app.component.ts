import { Component } from '@angular/core';
import { DeviceDetectionService } from './device-detection/services/device-detection.service';
import {SupportedDeviceTypes} from "./device-detection/models/SupportedDeviceTypes";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular 5';

  SupportedDeviceTypes = SupportedDeviceTypes;
}
