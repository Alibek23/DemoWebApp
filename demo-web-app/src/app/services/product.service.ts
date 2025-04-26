import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductListDto } from '../models/product-list.model';
import { ProductDetailDto } from '../models/product-detail.model';
import { ProductCreateDto } from '../models/product-create.model';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(page = 1, pageSize = 10): Observable<ProductListDto[]> {
    return this.http.get<ProductListDto[]>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }

  getProduct(id: number): Observable<ProductDetailDto> {
    return this.http.get<ProductDetailDto>(`${this.baseUrl}/${id}`);
  }

  addProduct(dto: ProductCreateDto): Observable<ProductDetailDto> {
    return this.http.post<ProductDetailDto>(this.baseUrl, dto);
  }

  getTotalProductCount(filter: string = ''): Observable<number> {
    const url = `${this.baseUrl}/products/count?filter=${filter}`;
    return this.http.get<number>(url);
  }
}
