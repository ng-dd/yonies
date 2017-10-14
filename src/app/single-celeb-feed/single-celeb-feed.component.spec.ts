import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCelebFeedComponent } from './single-celeb-feed.component';

describe('SingleCelebFeedComponent', () => {
  let component: SingleCelebFeedComponent;
  let fixture: ComponentFixture<SingleCelebFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCelebFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCelebFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
