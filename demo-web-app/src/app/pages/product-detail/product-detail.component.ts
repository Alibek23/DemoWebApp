import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDetailDto } from '../../models/product-detail.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(ProductService);
  product?: ProductDetailDto;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return id ? this.service.getProduct(id) : of(undefined);
      })
    ).subscribe(product => this.product = product);
  }
}
