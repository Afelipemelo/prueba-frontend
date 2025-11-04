import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { InventoryService } from '../../../../products/service/inventory.service';
import { InventoryResponse } from '../../../../products/interface/inventory.interface';

@Component({
  selector: 'modal-inventory',
  imports: [],
  templateUrl: './modal-inventory.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalInventory {

  productId = input.required<number>();
  inventoryService = inject(InventoryService);

  inventoryStock = signal<InventoryResponse | null>(null);
  saveSuccess = signal<boolean>(false);

  tempStock = signal<number>(0);

  ngOnInit(): void {
    this.loadInventory();
  }

loadInventory(): void {
    this.inventoryService.getInventory(this.productId())
      .subscribe({
        next: (response) => {
          this.inventoryStock.set(response);
          this.tempStock.set(0);
        },
        error: (err) => {
          console.error("Error cargando inventario:", err);
          this.tempStock.set(0);
        }
      });
  }

  onStockChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = parseInt(inputElement.value, 10);

    this.tempStock.set(isNaN(value) ? 0 : value);
  }

  saveInventory(): void {
    const stockChange = this.tempStock();

    if (stockChange === 0) return;
    this.tempStock.set(0);

    this.inventoryService.updateInventory(this.productId(), stockChange)
      .subscribe({
        next: (response) => {
          this.inventoryStock.set(response);
          this.saveSuccess.set(true);

          setTimeout(() => {
            this.saveSuccess.set(false);
          }, 3000);
        },
        error: (err) => {
          console.error("Error al guardar inventario:", err);
          this.tempStock.set(stockChange);
        }
      });
  }

closeModal(): void {
    (document.getElementById('inventory_modal') as HTMLDialogElement).close();
    this.tempStock.set(0);
  }
}
