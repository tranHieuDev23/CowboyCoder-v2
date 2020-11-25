import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BioBoxComponent } from './bio-box.component';

describe('BioBoxComponent', () => {
  let component: BioBoxComponent;
  let fixture: ComponentFixture<BioBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BioBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
