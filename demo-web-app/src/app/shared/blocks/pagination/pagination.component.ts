import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./pagination.component.scss'],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() isNextAvailable = false;
  @Output() pageChange = new EventEmitter<number>();

  prev() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  next() {
    if (this.isNextAvailable) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
