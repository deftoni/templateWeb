import { TestBed } from '@angular/core/testing';

import { EmailsService } from './emails.service';

describe('EmailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailsService = TestBed.get(EmailsService);
    expect(service).toBeTruthy();
  });
});
