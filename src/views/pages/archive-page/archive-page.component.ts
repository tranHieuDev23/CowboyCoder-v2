import { Component, Inject, PLATFORM_ID, Optional, ViewChild } from '@angular/core';
import { SSRComponent } from '../../ssr-component';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Author } from 'src/models/author';
import { Post } from 'src/models/post';
import { GLOBAL_CONFIGS } from 'src/configs/global-config';
import { butterService } from 'src/controllers/butterCMS.service';
import { LoadingScreenComponent } from '../../app/components/loading-screen/loading-screen.component';
import { STATUS_404 } from 'src/constants';

const KEY_DATA = makeStateKey('KEY_DATA');
const KEY_STATUS = makeStateKey('KEY_STATUS');

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.scss']
})
export class ArchivePageComponent extends SSRComponent {
  @ViewChild(LoadingScreenComponent, { static: true }) private loadingScreen: LoadingScreenComponent;
  posts: Post[];
  title: string;
  author: Author;
  currentPage: number;
  lastPage: number;
  baseUrl: string;

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
    const status = this.transferState.get(KEY_STATUS, null);
    this.transferState.set(KEY_STATUS, null);
    if (status === STATUS_404) {
      this.navigateToError(404);
      return;
    }

    this.loadingScreen.show();
    const transferData = this.transferState.get(KEY_DATA, null);
    this.transferState.set(KEY_DATA, null);
    if (transferData !== null) {
      const { type, slug, currentPage, metaData, postsData } = transferData;
      this.setupView(type, slug, currentPage, metaData, postsData);
      if ((<any>window).FB)
        (<any>window).FB.XFBML.parse();
      this.loadingScreen.hide();
      return;
    }

    const type = params['type'];
    if (type !== 'category' && type !== 'tag' && type !== 'author') {
      this.navigateToError(404);
      return;
    }

    const slug = params['slug'];
    const metaPromise = butterService[type].retrieve(slug);

    const currentPage = params['page'] !== undefined ? +params['page'] : 1;
    const requestParams: any = {
      page: currentPage,
      page_size: GLOBAL_CONFIGS.ARCHIVE_PAGE_CONFIGS.ARCHIVE_PAGE_SIZE,
      exclude_body: true
    };
    if (type == 'category')
      requestParams.category_slug = slug;
    if (type == 'tag')
      requestParams.tag_slug = slug;
    if (type == 'author')
      requestParams.author_slug = slug;
    const postsPromise = butterService.post.list(requestParams);

    Promise.all([metaPromise, postsPromise]).then((result) => {
      const metaData = result[0].data;
      const postsData = result[1].data;
      this.setupView(type, slug, currentPage, metaData, postsData);
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
      this.transferState.set(KEY_STATUS, STATUS_404);
      this.response.status(404);
      return;
    }

    const type = this.response.locals.type;
    const slug = this.response.locals.slug;
    const currentPage = this.response.locals.currentPage;
    const metaData = this.response.locals.meta;
    const postsData = this.response.locals.posts;
    this.setupView(type, slug, currentPage, metaData, postsData);
    this.transferState.set(KEY_DATA, { type, slug, currentPage, metaData, postsData });
  }

  private setupView(type: string, slug: string, currentPage: number, metaData: any, postsData: any): void {
    this.title = this.generateTitle(type, metaData, currentPage);
    this.titleService.setTitle(this.title);
    if (type == 'author')
      this.author = metaData.data;
    else
      this.author = null;
    this.posts = postsData.data;
    this.currentPage = currentPage;
    this.lastPage = Math.floor(
      (postsData.meta.count + GLOBAL_CONFIGS.ARCHIVE_PAGE_CONFIGS.ARCHIVE_PAGE_SIZE - 1) / GLOBAL_CONFIGS.ARCHIVE_PAGE_CONFIGS.ARCHIVE_PAGE_SIZE
    );
    this.baseUrl = `/archive/${type}/${slug}`;
    this.updateSEOMetaTags();
  }

  private generateTitle(type: string, metaData: any, currentPage: number): string {
    if (type === 'category')
      return GLOBAL_CONFIGS.ARCHIVE_PAGE_CONFIGS.ARCHIVE_PAGE_TITLE_CATEGORY(metaData.data.name, currentPage);
    if (type === 'tag')
      return GLOBAL_CONFIGS.ARCHIVE_PAGE_CONFIGS.ARCHIVE_PAGE_TITLE_TAG(metaData.data.name, currentPage);
    const authorName = GLOBAL_CONFIGS.GENERAL_CONFIGS.SHOW_FIRST_NAME_FIRST 
      ? `${metaData.data.first_name} ${metaData.data.last_name}` 
      : `${metaData.data.last_name} ${metaData.data.first_name}`;
    return GLOBAL_CONFIGS.ARCHIVE_PAGE_CONFIGS.ARCHIVE_PAGE_TITLE_AUTHOR(authorName, currentPage);
  }

  private updateSEOMetaTags(): void {
    const description: string = this.title;
    this.metaService.addTags([
      { name: 'description', content: description },
      { property: 'og:url', content: this.router.url },
      { property: 'og:title', content: this.title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_FEATURE_IMAGE_URL },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
