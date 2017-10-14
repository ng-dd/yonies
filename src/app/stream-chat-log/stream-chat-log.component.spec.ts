import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamChatLogComponent } from './stream-chat-log.component';

describe('StreamChatLogComponent', () => {
  let component: StreamChatLogComponent;
  let fixture: ComponentFixture<StreamChatLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamChatLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamChatLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
