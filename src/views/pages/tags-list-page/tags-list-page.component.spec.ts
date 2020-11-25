import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TagsListPageComponent } from './tags-list-page.component';

describe('TagsListPageComponent', () => {
  let component: TagsListPageComponent;
  let fixture: ComponentFixture<TagsListPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
