import { TestBed } from '@angular/core/testing';

import { ClientWindowService } from './client-window.service';

describe('ClientWindowService', () => {
  let service: ClientWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
