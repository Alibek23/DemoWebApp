import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { ProductDetailDto } from '../../models/product-detail.model';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getProduct']);

    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => '1' }) } },
        { provide: ProductService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    productServiceSpy.getProduct.and.returnValue(of({
      productId: 1,
      productName: 'Test Product',
      unitPrice: 100
    } as ProductDetailDto));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product from service', () => {
    expect(productServiceSpy.getProduct).toHaveBeenCalledWith(1);
    expect(component.product).toEqual(jasmine.objectContaining({
      productId: 1,
      productName: 'Test Product'
    }));
  });
});
