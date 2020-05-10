import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnDestroy
} from "@angular/core";
import { DeviceDetectionService } from "../services/device-detection.service";
import { SupportedDeviceTypes } from "../models/SupportedDeviceTypes";
import { Subscription } from "rxjs";

@Directive({
  selector: "[ifViewportSize]"
})
export class ViewportSizeDirective implements OnDestroy {
  private _layoutResizeSubscription: Subscription;

  constructor(
    private readonly deviceDetectionService: DeviceDetectionService,
    private readonly viewContainer: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>
  ) {}

  @Input("ifViewportSize")
  set whenToDisplay(whenToDisplay: SupportedDeviceTypes) {
    this._layoutResizeSubscription = this.deviceDetectionService.layoutSize$.subscribe(
      (currentWindowWidth: SupportedDeviceTypes) => {

        if (currentWindowWidth === whenToDisplay) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }

  ngOnDestroy() {
    this._layoutResizeSubscription.unsubscribe();
  }
}
