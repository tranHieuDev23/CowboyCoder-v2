import { Component, OnInit, ViewChild, ElementRef, NgZone, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {
  @ViewChild('loadingScreen', { static: true }) loading: ElementRef;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2
  ) { }

  ngOnInit() { }

  public show(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.removeClass(this.loading.nativeElement, 'hidden')
    })
  }

  public hide(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.addClass(this.loading.nativeElement, 'hidden')
    })
  }
}