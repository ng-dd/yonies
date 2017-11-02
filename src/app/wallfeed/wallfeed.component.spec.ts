import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallfeedComponent } from './wallfeed.component';

describe('WallfeedComponent', () => {
  let component: WallfeedComponent;
  let fixture: ComponentFixture<WallfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
