import { Component, computed, input, linkedSignal, output } from '@angular/core';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {

  pages = input(0)
  currentPage = input<number>(1)
  pageChanged = output<number>();

  getPages = computed(()=>{
    return Array.from({length: this.pages()},(_, i)=> i + 1)
  })

  selectPage(page: number): void {
    if (page !== this.currentPage()) {
      this.pageChanged.emit(page);
    }
  }
}
