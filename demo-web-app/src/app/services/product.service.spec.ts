import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { ProductListDto } from '../models/product-list.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const dummyProducts: ProductListDto[] = [
      { productId: 1, productName: 'Test Product' },
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products?page=1&pageSize=10`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should handle 404 error', () => {
    const errorMessage = '404 error';

    service.getProducts().subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products?page=1&pageSize=10`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
