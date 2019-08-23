import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostExcerptPreviewComponent } from './post-excerpt-preview.component';

describe('PostExcerptPreviewComponent', () => {
  let component: PostExcerptPreviewComponent;
  let fixture: ComponentFixture<PostExcerptPreviewComponent>;

  beforeEach(async(() => {
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
