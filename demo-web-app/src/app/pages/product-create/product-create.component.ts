import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductCreateDto } from '../../models/product-create.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreateComponent {
  private fb = inject(FormBuilder);
  private service = inject(ProductService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    productName: ['', Validators.required],
    supplierId: [null, Validators.required],
    categoryId: [null, Validators.required],
    unitPrice: [null, Validators.required]
  });

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const dto: ProductCreateDto = {
        productName: formValue.productName ?? '',
        supplierId: formValue.supplierId ?? 0,
        categoryId: formValue.categoryId ?? 0,
        unitPrice: formValue.unitPrice ?? 0
      };

      this.service.addProduct(dto).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Create failed:', err)
      });
    }
  }
}