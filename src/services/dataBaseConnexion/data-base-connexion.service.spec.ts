import { TestBed } from '@angular/core/testing';

import { DataBaseConnexionService } from './data-base-connexion.service';

describe('DataBaseConnexionService', () => {
  let service: DataBaseConnexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBaseConnexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
