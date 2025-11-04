
import { Component, OnInit, inject, input, signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../interface/product.interface';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'product-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl : './product-details.component.html'
})
export class ProductDetailsComponent  {

  product = input.required<Product>();
  wasSave = signal<boolean>(false);
  productForm!: FormGroup;

  private fb = inject(FormBuilder);
  private productService = inject(ProductsService);

  constructor() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: [''],
      productPrice: [0, [Validators.required, Validators.min(0.01)]],
      productCategory: ['', [
        Validators.required,
        Validators.pattern(/^(FASHION_ACCESSORIES|ELECTRONICS_TECHNOLOGY|HOME_DECORATION|SPORTS|TOYS_BAY)$/)
      ]],
      productImages: [''],
    });
    effect(() => {
        const currentProduct = this.product();
        if (currentProduct) {
            this.setFormValue(currentProduct);
        }
    });
  }

  setFormValue(productData: Product) {
    this.productForm.patchValue({
      productName: productData.productName,
      productDescription: productData.productDescription,
      productPrice: productData.productPrice,
      productCategory: productData.productCategory,
      productImages: productData.productImages,
    });
  }

  async onSubmit() {
    this.productForm.markAllAsTouched();
    if (!this.productForm.valid) {
      console.warn('Formulario inválido. No se puede guardar.');
      return;
    }
    const updatedData = this.productForm.value;
    const productId = this.product().productId;
    console.log(updatedData)
    this.productService.updateProduct(productId, updatedData)
      .subscribe({
        next: (response) => {
          console.log('Producto actualizado con éxito', response);

          this.wasSave.set(true);
          setTimeout(() => { this.wasSave.set(false); }, 3000);
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
  }
}
