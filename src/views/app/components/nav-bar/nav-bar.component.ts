import { Component, Inject, PLATFORM_ID, Optional, NgZone, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { SSRComponent } from '../../../ssr-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Category } from 'src/models/category';
import { butterService } from 'src/controllers/butterCMS.service';
import { faSearch, faBars, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GLOBAL_CONFIGS } from 'src/configs/global-config';

const KEY_CATEGORIES = makeStateKey('KEY_NAV_CATEGORIES');

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent extends SSRComponent {
  @ViewChild('sidebar', { static: true }) private sidebar: ElementRef;
  @ViewChild('overlay', { static: true }) private overlay: ElementRef;
  @ViewChild('searchBoxLg', { static: true }) private searchBoxLg: ElementRef;
  @ViewChild('searchBoxSm', { static: true }) private searchBoxSm: ElementRef;
  categories: Category[];
  searchIcon = faSearch;
  faBars = faBars;
  faTimes = faTimes;
  faArrowLeft = faArrowLeft;
  showingSearchBox: boolean = false;
  searchQuery: string;
  blogTitle: string = GLOBAL_CONFIGS.GENERAL_CONFIGS.BLOG_TITLE;
  homePageText: string = GLOBAL_CONFIGS.NAVBAR_CONFIGS.HOME_PAGE_TEXT;
  tagsListPageText: string = GLOBAL_CONFIGS.NAVBAR_CONFIGS.TAGS_LIST_PAGE_TEXT;
  aboutPageText: string = GLOBAL_CONFIGS.NAVBAR_CONFIGS.ABOUT_PAGE_TEXT;

  constructor(
    protected readonly router: Router,
    protected readonly activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(RESPONSE) protected readonly response: any,
    protected readonly transferState: TransferState,
    private readonly ngZone: NgZone,
    private readonly renderer: Renderer2
  ) {
    super(router, activatedRoute, platformId, response, transferState);
  }

  onBrowserInit() {
    const categories = this.transferState.get<Category[]>(KEY_CATEGORIES, null);
    this.transferState.set<Category[]>(KEY_CATEGORIES, null);
    if (categories !== null) {
      this.categories = categories;
      return;
    }

    butterService.category.list()
      .then((result) => {
        this.categories = result.data.data;
      }, (error) => {
        this.navigateToError(error);
      });
  }

  onServerInit() {
    const categories = this.response.locals.categories;
    this.categories = categories;
    this.transferState.set<Category[]>(KEY_CATEGORIES, categories);
  }

  showSidebar(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.addClass(this.sidebar.nativeElement, 'show');
      this.renderer.addClass(this.overlay.nativeElement, 'active');
    });
  }

  hideSidebar(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.removeClass(this.sidebar.nativeElement, 'show');
      this.renderer.removeClass(this.overlay.nativeElement, 'active');
    });
  }

  toggleSearchBox(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.showingSearchBox) {
        this.renderer.addClass(this.searchBoxLg.nativeElement, 'open');
        this.renderer.addClass(this.searchBoxSm.nativeElement, 'open');
        this.searchIcon = faTimes;
      } else {
        this.renderer.removeClass(this.searchBoxLg.nativeElement, 'open');
        this.renderer.removeClass(this.searchBoxSm.nativeElement, 'open');
        this.searchIcon = faSearch;
      }
      this.showingSearchBox = !this.showingSearchBox;
    });
  }

  performSearch(): void {
    if (this.searchQuery === null)
      return;
    this.searchQuery = this.searchQuery.trim();
    if (this.searchQuery.length === 0)
      return;
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.searchQuery
      }
    });
    this.toggleSearchBox();
    this.searchQuery = null;
  }
}
