import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { TestComponent } from "./test.component";
import { DeviceDetectionModule } from "./device-detection/device-detection.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DeviceDetectionModule.forRoot({ medium: 400, large: 500 }),
    
  ],
  declarations: [AppComponent, HelloComponent, TestComponent],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
