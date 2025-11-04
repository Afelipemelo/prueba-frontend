import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private _currentPage = signal<number>(1);
  private _pageSize = signal<number>(12);

  currentPage = this._currentPage.asReadonly();
  pageSize = this._pageSize.asReadonly();

  setCurrentPage(page: number): void {
    if (page >= 1) {
      this._currentPage.set(page);
    }
  }

  getPageForApi(): number {
    return this._currentPage() - 1;
  }

}
