import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {

let service: DashboardService;
let fakeSocket: Subject<any>; 
const fakeSocketCtor = jasmine
  .createSpy('WEBSOCKET_CTOR')
  .and.callFake(() => fakeSocket);


  beforeEach(() => {
    TestBed.configureTestingModule({});
    providers: [DashboardService]
    service = TestBed.inject(DashboardService);

     fakeSocket = new Subject<any>();
     spyOn(fakeSocket, 'next').and.callThrough();
     fakeSocketCtor.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
