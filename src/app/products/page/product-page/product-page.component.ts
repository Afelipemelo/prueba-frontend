import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { CommonModule,Location } from '@angular/common';
import { ModalInventory } from '../../../shared/components/modal/modal-inventory/modal-inventory';
import { ProductDetailsComponent } from "../../components/product-details/product-details.component";

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, ModalInventory, ProductDetailsComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService)
  location = inject(Location)
  productSlug$ : number =  this.activatedRoute.snapshot.params['id'];

    get placeholderImageUrl(): string {
    const productId = this.productSlug$ || 1;
    return `https://picsum.photos/seed/${productId}/400/300`;
  }

   productResource = rxResource({
    request: () => ({slug : this.productSlug$ }),
    loader:({request}) =>{ return this.productsService.getProductById(request.slug)}
  })

  goBack():void{
    this.location.back()
  }

  openInventoryModal(): void {
    const modal = document.getElementById('inventory_modal') as HTMLDialogElement;
    if (modal) {
        modal.showModal();
    }
}

}
