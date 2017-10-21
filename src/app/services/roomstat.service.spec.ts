import { TestBed, inject } from '@angular/core/testing';

import { RoomstatService } from './roomstat.service';

describe('RoomstatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomstatService]
    });
  });

  it('should be created', inject([RoomstatService], (service: RoomstatService) => {
    expect(service).toBeTruthy();
  }));
});
