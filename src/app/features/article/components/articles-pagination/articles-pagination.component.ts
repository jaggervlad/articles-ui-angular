import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-articles-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './articles-pagination.component.html',
})
export class ArticlesPaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number[] = [];
  @Output() onPageChange = new EventEmitter<number>();

  constructor() {}

  setPageTo(pageNumber: number) {
    this.onPageChange.emit(pageNumber);
  }
}
