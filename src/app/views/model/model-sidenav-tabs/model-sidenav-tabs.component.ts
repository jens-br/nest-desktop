import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { AppService } from '../../../services/app/app.service';
import { ModelService } from '../../../services/model/model.service';


@Component({
  selector: 'app-model-sidenav-tabs',
  templateUrl: './model-sidenav-tabs.component.html',
  styleUrls: ['./model-sidenav-tabs.component.scss']
})
export class ModelSidenavTabsComponent implements OnInit {
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private _appService: AppService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher,
    public modelService: ModelService,
  ) {
    this.mobileQuery = _media.matchMedia('(max-width: 1023px)');
    this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  triggerResize(): void {
    window.dispatchEvent(new Event('resize'));
  }

  toggleSidenav(): void {
    this.modelService.sidenavOpened = !this.modelService.sidenavOpened;
  }

  devMode(): boolean {
    return this._appService.app.config.devMode === true;
  }

}
