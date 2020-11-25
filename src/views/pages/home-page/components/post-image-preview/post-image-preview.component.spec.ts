import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostImagePreviewComponent } from './post-image-preview.component';

describe('PostImagePreviewComponent', () => {
  let component: PostImagePreviewComponent;
  let fixture: ComponentFixture<PostImagePreviewComponent>;

  beforeEach(waitForAsync(() => {
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
