import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentItemWallComponent } from './content-item-wall.component';

describe('ContentItemWallComponent', () => {
  let component: ContentItemWallComponent;
  let fixture: ComponentFixture<ContentItemWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentItemWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentItemWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
