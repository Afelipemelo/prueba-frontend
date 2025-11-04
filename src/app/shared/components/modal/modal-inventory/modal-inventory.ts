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

  loadInventory(): void {
    this.inventoryService.getInventory(this.productId())
      .subscribe({
        next: (response) => {
          this.inventoryStock.set(response);
        },
        error: (err) => {
          console.error("Error cargando inventario:", err);
          const defaultStock = 0;

          const defaultResponse: InventoryResponse = {
            data: {
              type: 'inventories',
              id: this.productId(),
              attributes: {
                stock: defaultStock,
                stockChange: null,
              }
            }
          };
          this.inventoryStock.set(defaultResponse);
          this.tempStock.set(defaultStock);
        }
      });
  }

  addStock(): void {
    this.tempStock.update(current => current + 1);
  }

  subtractStock(): void {
    if (this.inventoryStock()?.data.attributes.stock != 0) {
      this.tempStock.update(current => current - 1);
    }
  }

  saveInventory(): void {
    const newStock = this.tempStock();
    this.tempStock.set(0)
    this.inventoryService.updateInventory(this.productId(), newStock)
      .subscribe({
        next: (response) => {
          this.inventoryStock.set(response);
          this.saveSuccess.set(true);

          setTimeout(() => {
            this.saveSuccess.set(false);
          }, 3000);
        },
        error: (err) => console.error("Error al guardar inventario:", err)
      });
  }

  closeModal(): void {
    (document.getElementById('inventory_modal') as HTMLDialogElement).close();
  }
  ngOnInit(): void {
    this.loadInventory();
  }
}
