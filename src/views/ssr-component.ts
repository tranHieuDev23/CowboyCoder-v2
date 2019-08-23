import { ActivatedRoute, Params, Router } from "@angular/router";
import { OnInit, Inject, PLATFORM_ID, Optional } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { RESPONSE } from "@nguniversal/express-engine/tokens";
import { TransferState } from "@angular/platform-browser";

export abstract class SSRComponent implements OnInit {
  protected readonly isBrowser: boolean

  constructor(
    protected readonly router: Router,
    protected readonly activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(RESPONSE) protected readonly response: any,
    protected readonly transferState: TransferState
  ) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (this.isBrowser)
        this.onBrowserInit(params)
      else
        this.onServerInit(params)
    })
  }

  navigateToError(error: any = null): void {
    this.router.navigateByUrl('/error', {
      skipLocationChange: true,
      replaceUrl: false,
      state: { error }
    });
  }

  abstract onBrowserInit(params: Params): void
  abstract onServerInit(params: Params): void
}