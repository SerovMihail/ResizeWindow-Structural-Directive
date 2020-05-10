import {
  Injectable,
  Inject,
  InjectionToken,
  HostListener,
  OnDestroy
} from "@angular/core";
import { IConfig } from "../models/IConfig";
import { Observable, fromEvent, BehaviorSubject, Subscription } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { SupportedDeviceTypes } from "../models/SupportedDeviceTypes";

export const DeviceDetectionConfigService = new InjectionToken<IConfig>(
  "DeviceDetectionConfig"
);

@Injectable({
  providedIn: "root"
})
export class DeviceDetectionService implements OnDestroy {
  public layoutSize$ = new BehaviorSubject<SupportedDeviceTypes>(
    this.getLayoutTypeByWindowWidth(this.window.innerWidth)
  );

  private _windowResizeSubscription: Subscription;

  constructor(
    @Inject(DeviceDetectionConfigService) private config: IConfig,
    @Inject(Window) private window: Window
  ) {
    this.observeResize();
  }

  private observeResize(): void {
    let previousLayoutSize = this.getLayoutTypeByWindowWidth(
      this.window.innerWidth
    );

    this._windowResizeSubscription = fromEvent(window, "resize")
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((event: Event) => (event.target as Window).innerWidth)
      )
      .subscribe(width => {
        const nextLayourSize = this.getLayoutTypeByWindowWidth(width);
        if (nextLayourSize === previousLayoutSize) {
          return;
        }

        this.layoutSize$.next(nextLayourSize);

        previousLayoutSize = nextLayourSize;
      });
  }

  private getLayoutTypeByWindowWidth(width: number) {
    if (width >= this.config.large) {
      return SupportedDeviceTypes.Large;
    }

    if (width >= this.config.medium) {
      return SupportedDeviceTypes.Medium;
    }

    return SupportedDeviceTypes.Small;
  }

  ngOnDestroy() {
    this._windowResizeSubscription.unsubscribe();
  }
}
