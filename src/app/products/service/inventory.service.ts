import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { InventoryResponse } from '../interface/inventory.interface';

const baseUrl = environment.baseUrlInventory;
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient);

  getInventory(productId: number): Observable<InventoryResponse> {
    return this.http.get<InventoryResponse>(`${baseUrl}/inventories/${productId}`);
  }

  updateInventory(productId: number, newStock: number): Observable<InventoryResponse> {
    const body = {
      data: {
        type: 'inventories',
        attributes: {
          stockChange: newStock
        }
      }
    };
    return this.http.patch<InventoryResponse>(`${baseUrl}/inventories/${productId}`, body);
  }
}
