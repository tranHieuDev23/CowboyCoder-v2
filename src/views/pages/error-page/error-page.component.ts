import { Component, Inject, PLATFORM_ID, Optional, ViewChild } from '@angular/core';
import { SSRComponent } from 'src/views/ssr-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { TransferState, Title, Meta } from '@angular/platform-browser';
import { Params } from '@fortawesome/fontawesome-svg-core';
import { LoadingScreenComponent } from 'src/views/app/components/loading-screen/loading-screen.component';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent extends SSRComponent {
  @ViewChild(LoadingScreenComponent, { static: true }) private loadingScreen: LoadingScreenComponent;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) protected platformId: Object,
    @Optional() @Inject(RESPONSE) protected response: any,
    protected transferState: TransferState,
    private titleService: Title,
    private metaService: Meta
  ) {
    super(router, activatedRoute, platformId, response, transferState);
  }

  onBrowserInit(params: Params): void {
    this.loadingScreen.show();
    window.scrollTo(0, 0);
    if ((<any>window).FB)
      (<any>window).FB.XFBML.parse();
    this.loadingScreen.hide();
    this.titleService.setTitle('Error');
  }
  
  onServerInit(params: Params): void {

  }
}
