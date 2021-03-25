import { Component, Inject, PLATFORM_ID, Optional, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { TransferState, Title, Meta, makeStateKey } from '@angular/platform-browser';
import { Post } from 'src/models/post';
import { isPlatformBrowser } from '@angular/common';
import { butterService } from 'src/controllers/butterCMS.service';
import { GLOBAL_CONFIGS } from 'src/configs/global-config';
import { LoadingScreenComponent } from '../../app/components/loading-screen/loading-screen.component';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { STATUS_404 } from 'src/constants';

const KEY_STATUS = makeStateKey("KEY_STATUS");
const KEY_QUERY = makeStateKey("KEY_QUERY");
const KEY_POSTS = makeStateKey("KEY_POSTS");

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  @ViewChild(LoadingScreenComponent, { static: true }) private loadingScreen: LoadingScreenComponent;
  private isOnBrowser: boolean;
  query: string;
  posts: Post[] = [];
  faSearch = faSearch;
  noResultText: string = GLOBAL_CONFIGS.SEARCH_PAGE_CONFIGS.NO_RESULT_TEXT;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(RESPONSE) private response: any,
    private transferState: TransferState,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.isOnBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isOnBrowser)
      this.activatedRoute.queryParams.subscribe((params) => this.onBrowserInit(params));
    else
      this.activatedRoute.queryParams.subscribe((params) => this.onServerInit(params));
  }

  onBrowserInit(params: Params): void {
    const status = this.transferState.get<string>(KEY_STATUS, null);
    if (status === STATUS_404) {
      this.navigateToError(404);
      return;
    }

    let query = this.transferState.get<string>(KEY_QUERY, null);
    this.transferState.set<string>(KEY_QUERY, null);
    if (query !== null) {
      const posts = this.transferState.get<Post[]>(KEY_POSTS, []);
      this.transferState.set<Post[]>(KEY_POSTS, null);
      this.setupView(query, posts);
      if ((<any>window).FB)
        (<any>window).FB.XFBML.parse();
      this.loadingScreen.hide();
      return;
    }

    this.loadingScreen.show();
    query = params['query'];
    if (query === null) {
      this.setupView(null, []);
      if ((<any>window).FB)
        (<any>window).FB.XFBML.parse();
      this.loadingScreen.hide();
      return;
    }
    butterService.post.search(query, {
      page: 1,
      page_size: GLOBAL_CONFIGS.SEARCH_PAGE_CONFIGS.SEARCH_PAGE_SIZE
    }).then((result) => {
      const posts = result.data.data;
      this.setupView(query, posts);
      if ((<any>window).FB)
        (<any>window).FB.XFBML.parse();
      window.scrollTo(0, 0);
      this.loadingScreen.hide();
    }, (error) => {
      this.navigateToError(error);
    });
  }

  onServerInit(params: Params): void {
    if (this.response.locals.status === STATUS_404) {
      this.navigateToError(404);
      this.transferState.set<string>(KEY_STATUS, STATUS_404);
      this.response.status(404);
      return;
    }
    const query = params['query'];
    if (query === undefined) {
      this.setupView(null, []);
      return;
    }
    const posts = this.response.locals.posts;
    this.setupView(query, posts);
    this.transferState.set<string>(KEY_QUERY, query);
    this.transferState.set<Post[]>(KEY_POSTS, posts);
    return;
  }

  private navigateToError(error: any): void {
    this.router.navigateByUrl('/error', {
      skipLocationChange: true,
      replaceUrl: false,
      state: { error }
    });
  }

  private setupView(query: string, posts: Post[]): void {
    this.query = query;
    this.posts = posts;
    this.titleService.setTitle(GLOBAL_CONFIGS.SEARCH_PAGE_CONFIGS.SEARCH_PAGE_TITLE);
    this.metaService.addTags([
      { name: 'description', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_DESCRIPTION },
      { property: 'og:url', content: this.router.url },
      { property: 'og:title', content: GLOBAL_CONFIGS.SEARCH_PAGE_CONFIGS.SEARCH_PAGE_TITLE },
      { property: 'og:description', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_DESCRIPTION },
      { property: 'og:image', content: GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_FEATURE_IMAGE_URL },
      { property: 'og:type', content: 'website' },
    ]);
  }

  performSearch(): void {
    if (this.query === null)
      return;
    this.query = this.query.trim();
    if (this.query.length === 0)
      return;
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.query
      }
    });
  }
}
