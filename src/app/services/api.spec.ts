import {addProviders} from "@angular/core/testing/testing";
import {BaseRequestOptions, Http, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing/mock_backend";
import {ApiService} from "./api";
import {inject} from "@angular/core/testing/test_injector";
import {async} from "@angular/core/testing/async";

describe('ApiService', () => {
  let apiService: ApiService;
  let mockService: MockBackend;

  beforeEach(() => addProviders([
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions]
    },
    ApiService
  ]));

  beforeEach(inject([ApiService, MockBackend], (service, mock) => {
    apiService = service;
    mockService = mock;
  }));

  it('should make a get request', async(() => {
    let response = {notes: [1, 2, 3]};

    mockService.connections.subscribe(connection => {
      connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(response),
            status: 200
          })
      ));
    });

    apiService.get('/notes')
        .subscribe(notes => {
          expect(notes).toEqual(response);
        });
  }));

  it('should make a post request', async(() => {
    let response = {notes: {value: 'thing'}};

    mockService.connections.subscribe(connection => {
      connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(response),
            status: 201
          })
      ));
    });

    apiService.post('/notes', response)
        .subscribe(note => {
          expect(note).toEqual(response);
        });
  }));
});