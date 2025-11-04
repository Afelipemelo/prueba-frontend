import { ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'products-layout',
  imports: [RouterOutlet],
  templateUrl: './ProductsLayout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsLayoutComponent {

 }
