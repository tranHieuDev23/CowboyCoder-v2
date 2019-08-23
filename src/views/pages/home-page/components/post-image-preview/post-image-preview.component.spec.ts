import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostImagePreviewComponent } from './post-image-preview.component';

describe('PostImagePreviewComponent', () => {
  let component: PostImagePreviewComponent;
  let fixture: ComponentFixture<PostImagePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostImagePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostImagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
