import { Component, Inject, PLATFORM_ID, Optional, ViewChild } from '@angular/core';
import { SSRComponent } from '../../ssr-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { TransferState, Title, Meta, makeStateKey } from '@angular/platform-browser';
import { Tag } from 'src/models/tag';
import { butterService } from 'src/controllers/butterCMS.service';
import { GLOBAL_CONFIGS } from 'src/configs/global-config';
import { LoadingScreenComponent } from '../../app/components/loading-screen/loading-screen.component';
import { STATUS_404 } from 'src/constants';

const KEY_STATUS = makeStateKey('KEY_STATUS');
const KEY_TAGS = makeStateKey('KEY_TAGS');

@Component({
  selector: 'app-tags-list-page',
  templateUrl: './tags-list-page.component.html',
  styleUrls: ['./tags-list-page.component.scss']
})
export class TagsListPageComponent extends SSRComponent {
  @ViewChild(LoadingScreenComponent, { static: true }) private loadingScreen: LoadingScreenComponent;
  tags: Tag[];
  tagsListPageTitle: string = GLOBAL_CONFIGS.TAGS_LIST_PAGE_CONFIGS.TAGS_LIST_PAGE_TITLE;

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

  onBrowserInit(): void {
    const status = this.transferState.get<string>(KEY_STATUS, null);
    this.transferState.set<string>(KEY_STATUS, null);
    if (status === STATUS_404) {
      this.navigateToError(404);
      return;
    }

    const tags = this.transferState.get<Tag[]>(KEY_TAGS, null);
    this.transferState.set<Tag[]>(KEY_TAGS, null);
    if (tags !== null) {
      this.setupView(tags);
      if ((<any>window).FB)
        (<any>window).FB.XFBML.parse();
      this.loadingScreen.hide();
      return;
    }

    this.loadingScreen.show();
    butterService.tag.list()
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

  onServerInit(): void {
    if (this.response.locals.status === STATUS_404) {
      this.navigateToError(404);
      this.transferState.set<string>(KEY_STATUS, STATUS_404);
      this.response.status(404);
      return;
    }
    const tags = this.response.locals.tags;
    this.setupView(tags);
    this.transferState.set<Tag[]>(KEY_TAGS, tags);
  }

  private setupView(tags: Tag[]): void {
    this.tags = tags;
    this.titleService.setTitle(GLOBAL_CONFIGS.TAGS_LIST_PAGE_CONFIGS.TAGS_LIST_PAGE_TITLE);
    this.metaService.addTags([
      { name: 'description', content: GLOBAL_CONFIGS.TAGS_LIST_PAGE_CONFIGS.TAGS_LIST_PAGE_TITLE },
      { property: 'og:url', content: this.router.url },
      { property: 'og:title', content: GLOBAL_CONFIGS.TAGS_LIST_PAGE_CONFIGS.TAGS_LIST_PAGE_TITLE },
      { property: 'og:description', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_DESCRIPTION },
      { property: 'og:image', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_FEATURE_IMAGE_URL },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
