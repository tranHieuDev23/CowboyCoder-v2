import { Component, Inject, PLATFORM_ID, Optional, ViewChild } from '@angular/core';
import { SSRComponent } from '../../ssr-component';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Post } from 'src/models/post';
import { butterService } from 'src/controllers/butterCMS.service';
import { GLOBAL_CONFIGS } from 'src/configs/global-config';
import { Category } from 'src/models/category';
import { LoadingScreenComponent } from '../../app/components/loading-screen/loading-screen.component';
import { STATUS_404 } from 'src/constants';

const KEY_STATUS = makeStateKey('KEY_STATUS');
const KEY_LATEST_POSTS = makeStateKey('KEY_LATEST_POSTS');
const KEY_CATEGORIES = makeStateKey('KEY_CATEGORIES');
const KEY_CATEGORY_LATEST_POSTS = makeStateKey('KEY_CATEGORY_LATEST_POSTS');

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends SSRComponent {
  @ViewChild(LoadingScreenComponent, { static: true }) private loadingScreen: LoadingScreenComponent;
  latestPosts: Post[];
  categories: Category[];
  categoryLatestPosts: Post[][];
  latestPostsText: string = GLOBAL_CONFIGS.HOME_PAGE_CONFIGS.LATEST_POSTS_TEXT;

  constructor(
    protected readonly router: Router,
    protected readonly activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(RESPONSE) protected readonly response: any,
    protected readonly transferState: TransferState,
    private titleService: Title,
    private metaService: Meta,
  ) {
    super(router, activatedRoute, platformId, response, transferState);
  }

  onBrowserInit() {
    const status = this.transferState.get(KEY_STATUS, null);
    this.transferState.set(KEY_STATUS, null);
    if (status === STATUS_404) {
      this.navigateToError(404);
      return;
    }
    
    const latestPosts = this.transferState.get(KEY_LATEST_POSTS, null);
    this.transferState.set(KEY_LATEST_POSTS, null);
    if (latestPosts !== null) {
      const categories = this.transferState.get(KEY_CATEGORIES, null);
      const categoryLatestPosts = this.transferState.get(KEY_CATEGORY_LATEST_POSTS, null);
      this.transferState.set(KEY_CATEGORIES, null);
      this.transferState.set(KEY_CATEGORY_LATEST_POSTS, null);
      this.setupView(latestPosts, categories, categoryLatestPosts);
      if ((<any>window).FB)
        (<any>window).FB.XFBML.parse();
      this.loadingScreen.hide();
      return;
    }

    this.loadingScreen.show();
    const lastestPostsPromise = butterService.post.list({
      page: 1,
      page_size: GLOBAL_CONFIGS.HOME_PAGE_CONFIGS.MAX_LATEST_POSTS,
      exclude_body: true
    });
    const categoriesListPromise = butterService.category.list();
    Promise.all([lastestPostsPromise, categoriesListPromise])
      .then((result) => {
        const latestPosts: Post[] = result[0].data.data;
        const categories: Category[] = result[1].data.data;
        const categoryLatestPromises = Array(categories.length);
        categories.forEach((item, index) => {
          categoryLatestPromises[index] = butterService.post.list({
            category_slug: item.slug,
            page: 1,
            page_size: GLOBAL_CONFIGS.HOME_PAGE_CONFIGS.MAX_CATEGORY_LATEST_POSTS,
            exclude_body: true
          });
        });

        Promise.all(categoryLatestPromises)
          .then((result: any[]) => {
            const categoryLatestPosts: Post[][] = result.map((item) => item.data.data);
            this.setupView(latestPosts, categories, categoryLatestPosts);
            window.scrollTo(0, 0);
            if ((<any>window).FB)
              (<any>window).FB.XFBML.parse();
            this.loadingScreen.hide();
          }, (error) => {
            this.navigateToError(error);
          });
      }, (error) => {
        this.navigateToError(error);
      });
  }

  onServerInit() {
    if (this.response.locals.status === STATUS_404) {
      this.navigateToError(404);
      this.transferState.set(KEY_STATUS, STATUS_404);
      this.response.status(404);
      return;
    }
    const latestPosts = this.response.locals.latestPosts;
    const categories = this.response.locals.categories;
    const categoryLatestPosts = this.response.locals.categoryLatestPosts;
    this.setupView(latestPosts, categories, categoryLatestPosts);
    this.transferState.set(KEY_LATEST_POSTS, latestPosts);
    this.transferState.set(KEY_CATEGORIES, categories);
    this.transferState.set(KEY_CATEGORY_LATEST_POSTS, categoryLatestPosts);
  }

  private setupView(latestPosts: Post[], categories: Category[], categoryLatestPosts: Post[][]): void {
    this.latestPosts = latestPosts;
    this.categories = categories;
    this.categoryLatestPosts = categoryLatestPosts;
    this.titleService.setTitle(GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_TITLE);
    this.metaService.addTags([
      { name: 'description', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_DESCRIPTION },
      { property: 'og:url', content: this.router.url },
      { property: 'og:title', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_TITLE },
      { property: 'og:description', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_DESCRIPTION },
      { property: 'og:image', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_FEATURE_IMAGE_URL },
      { property: 'og:type', content: 'website' }
    ]);
  }
}
