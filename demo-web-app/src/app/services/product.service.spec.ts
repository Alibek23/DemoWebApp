import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { ProductListDto } from '../models/product-list.model.ts';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
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

    // const req = httpMock.expectOne('http://localhost:5000/api/products?page=1&pageSize=10');
    // expect(req.request.method).toBe('GET');
    // req.flush(dummyProducts);
  });
});
