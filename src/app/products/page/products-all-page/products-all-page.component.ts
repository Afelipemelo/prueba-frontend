import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { ProductsResponse } from '../../interface/product.interface';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'products-all-page',
  imports: [PaginationComponent,ProductCardComponent],
  templateUrl: './products-all-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsAllPageComponent {

productService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productResource = signal<ProductsResponse | null>(null);

  ngOnInit(): void {
    this.loadProducts(this.paginationService.currentPage());
  }

  loadProducts(page: number): void {
    this.paginationService.setCurrentPage(page);

    const apiPage = this.paginationService.getPageForApi();
    const size = this.paginationService.pageSize();

    this.productService.getProducts(apiPage, size)
      .subscribe({
        next: (response) => {
          this.productResource.set(response);
        },
        error: (err) => {
          console.error("Error al cargar productos:", err);
        }
      });
  }

}
