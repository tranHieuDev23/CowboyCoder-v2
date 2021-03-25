import { Component, Inject, PLATFORM_ID, Optional, ViewChild } from '@angular/core';
import { SSRComponent } from '../../ssr-component';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Author } from 'src/models/author';
import html from 'html-loader!../../../configs/about-page-content.html';
import { butterService } from 'src/controllers/butterCMS.service';
import { LoadingScreenComponent } from '../../app/components/loading-screen/loading-screen.component';
import { GLOBAL_CONFIGS } from 'src/configs/global-config';

const KEY_AUTHORS = makeStateKey('KEY_AUTHORS');

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent extends SSRComponent {
  @ViewChild(LoadingScreenComponent, { static: true }) private loadingScreen: LoadingScreenComponent;
  aboutContent: string = html;
  authors: Author[];
  authorsListText: string = GLOBAL_CONFIGS.ABOUT_US_PAGE_CONFIGS.AUTHORS_LIST_TEXT;

  constructor(
    protected readonly router: Router,
    protected readonly activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(RESPONSE) protected readonly response: any,
    protected readonly transferState: TransferState,
    private titleService: Title,
    private metaService: Meta
  ) {
    super(router, activatedRoute, platformId, response, transferState);
  }

  onBrowserInit() {
    const authors = this.transferState.get<Author[]>(KEY_AUTHORS, null);
    this.transferState.set<Author[]>(KEY_AUTHORS, null);
    if (authors !== null) {
      this.setupView(authors);
      if ((<any>window).FB)
        (<any>window).FB.XFBML.parse();
      this.loadingScreen.hide();
      return;
    }

    this.loadingScreen.show();
    butterService.author.list()
      .then((result) => {
        this.setupView(result.data.data);
        window.scrollTo(0, 0);
        if ((<any>window).FB)
          (<any>window).FB.XFBML.parse();
        this.loadingScreen.hide();
      }, (error) => {
        this.navigateToError(error);
      });
  }

  onServerInit() {
    const authors = this.response.locals.authors;
    this.setupView(authors);
    this.transferState.set<Author[]>(KEY_AUTHORS, authors);
  }

  private setupView(authors: Author[]): void {
    this.authors = authors;
    this.titleService.setTitle(GLOBAL_CONFIGS.ABOUT_US_PAGE_CONFIGS.ABOUT_PAGE_TITLE);
    this.metaService.addTags([
      { name: 'description', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_DESCRIPTION },
      { property: 'og:url', content: this.router.url },
      { property: 'og:title', content: GLOBAL_CONFIGS.ABOUT_US_PAGE_CONFIGS.ABOUT_PAGE_TITLE },
      { property: 'og:description', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_DESCRIPTION },
      { property: 'og:image', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_FEATURE_IMAGE_URL },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
