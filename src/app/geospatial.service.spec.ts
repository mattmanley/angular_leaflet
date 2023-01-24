import { TestBed } from '@angular/core/testing';

import { GeospatialService } from './geospatial.service';

describe('GeospatialService', () => {
  let service: GeospatialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeospatialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
