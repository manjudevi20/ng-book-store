import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpClientModule,
  HttpResponse,
} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { of } from 'rxjs';
import { mockBooks } from '../test/test.helper';

describe('BookService', () => {
  let service: BookService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [BookService, HttpClient],
    });
    service = TestBed.inject(BookService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search books', () => {
    spyOn(httpClient, 'get').and.returnValue(
      of({
        body: {
          items: mockBooks,
        },
      } as HttpResponse<any>)
    );
    service.searchBooks('angular');
    expect(httpClient.get).toHaveBeenCalled();
  });
});
