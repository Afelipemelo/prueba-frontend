import { SlicePipe } from '@angular/common';
import { Component, computed, effect, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import {Product} from "../../interface/product.interface"

@Component({
  selector: 'product-card',
  imports: [RouterLink,SlicePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {

  product = input.required<Product>();

  get placeholderImageUrl(): string {
    const productId = this.product()?.productId || 1;
    return `https://picsum.photos/seed/${productId}/400/300`;
  }
}
