import { Component, PLATFORM_ID, Inject, Optional, ViewChild, ElementRef } from '@angular/core';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RESPONSE } from "@nguniversal/express-engine/tokens";
import { SSRComponent } from '../../ssr-component';
import { Post } from 'src/models/post';
import { butterService } from 'src/controllers/butterCMS.service';
import { LoadingScreenComponent } from '../../app/components/loading-screen/loading-screen.component';
import { GLOBAL_CONFIGS } from 'src/configs/global-config';
import renderMathInElement from 'katex/contrib/auto-render/auto-render.js';
import { STATUS_404 } from 'src/constants';

const KEY_STATUS = makeStateKey('KEY_STATUS');
const KEY_DATA = makeStateKey('KEY_DATA');

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent extends SSRComponent {
  @ViewChild(LoadingScreenComponent, { static: true }) private loadingScreen: LoadingScreenComponent;
  @ViewChild('content', { static: true }) private contentContainer: ElementRef;
  post: Post;
  nextPost: Post;
  prevPost: Post;
  baseUrl: string = GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_URL;
  previousPostText: string = GLOBAL_CONFIGS.POST_PAGE_CONFIGS.PREVIOUS_POST_TEXT;
  nextPostText: string = GLOBAL_CONFIGS.POST_PAGE_CONFIGS.NEXT_POST_TEXT;

  constructor(
    public readonly router: Router,
    protected readonly activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(RESPONSE) protected readonly response: any,
    protected readonly transferState: TransferState,
    private readonly titleService: Title,
    private readonly metaService: Meta
  ) {
    super(router, activatedRoute, platformId, response, transferState);
  }

  onBrowserInit(params: Params): void {
    const status = this.transferState.get<string>(KEY_STATUS, null);
    this.transferState.set<string>(KEY_STATUS, null);
    if (status === STATUS_404) {
      this.navigateToError(404);
      return;
    }

    const data = this.transferState.get<any>(KEY_DATA, null);
    this.transferState.set<any>(KEY_DATA, null);
    if (data !== null) {
      this.setupView(data);
      if ((<any>window).FB)
        (<any>window).FB.XFBML.parse();
      setTimeout(() => renderMathInElement(this.contentContainer.nativeElement), 200);
      this.loadingScreen.hide();
      return;
    }

    this.loadingScreen.show();
    const slug = params['slug'];
    butterService.post.retrieve(slug)
      .then((result) => {
        this.setupView(result.data);
        window.scrollTo(0, 0);
        if ((<any>window).FB)
          (<any>window).FB.XFBML.parse();
        setTimeout(() => renderMathInElement(this.contentContainer.nativeElement), 200);
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

    const data = this.response.locals.data;
    this.transferState.set<any>(KEY_DATA, data);
    this.setupView(data);
  }

  private setupView(data: any): void {
    this.post = data.data;
    this.nextPost = data.meta.next_post;
    this.prevPost = data.meta.previous_post;
    this.titleService.setTitle(this.post.title);
    this.updateSEOMetaTags(this.post);
  }

  private updateSEOMetaTags(post: Post): void {
    this.metaService.addTags([
      { name: 'description', content: post.meta_description },
      { property: 'og:url', content: this.router.url },
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.meta_description },
      { property: 'og:image', content: post.featured_image },
      { property: 'og:type', content: 'article' },
    ])
  }
}
