import { TestBed } from '@angular/core/testing';
import { Users } from '../models/user';

describe('UserService', () => {
  let service: Users;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Users);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});