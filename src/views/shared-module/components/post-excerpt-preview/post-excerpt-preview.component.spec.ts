import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostExcerptPreviewComponent } from './post-excerpt-preview.component';

describe('PostExcerptPreviewComponent', () => {
  let component: PostExcerptPreviewComponent;
  let fixture: ComponentFixture<PostExcerptPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostExcerptPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostExcerptPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
