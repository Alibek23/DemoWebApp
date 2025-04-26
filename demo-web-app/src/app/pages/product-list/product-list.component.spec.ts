import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';

import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { PaginationComponent } from '../../shared/blocks/pagination/pagination.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, PaginationComponent, HttpClientTestingModule],
      providers: [{ provide: ProductService, useValue: spy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    productServiceSpy.getProducts.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
    expect(productServiceSpy.getProducts).toHaveBeenCalledWith(1, 10);
  });

  it('should call loadProducts when onPageChange is triggered', () => {
    spyOn(component, 'loadProducts');

    component.onPageChange(2);

    expect(component.currentPage).toBe(2);
    expect(component.loadProducts).toHaveBeenCalled();
  });
});
