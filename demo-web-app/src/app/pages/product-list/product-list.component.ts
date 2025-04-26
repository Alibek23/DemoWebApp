import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { ProductListDto } from '../../models/product-list.model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/blocks/pagination/pagination.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [PaginationComponent, CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private router = inject(Router);

  products: ProductListDto[] = [];
  filteredProducts: ProductListDto[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  isNextAvailable = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  onSearch() {
    this.filteredProducts = this.products.filter((product) =>
      product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
      this.productService.getProducts(this.currentPage + 1, this.pageSize).subscribe(nextData => {
        this.isNextAvailable = nextData.length > 0;
      });
    });
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  addProduct(): void {
    this.router.navigate(['/products/create']);
  }
}
