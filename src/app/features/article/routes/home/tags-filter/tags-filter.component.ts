import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TagService } from '../../../services/tag.service';
import { tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tags-filter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './tags-filter.component.html',
})
export class TagsFilterComponent {
  tags$ = inject(TagService)
    .getAll()
    .pipe(tap(() => (this.tagsLoaded = true)));
  tagsLoaded = false;

  @Output() handleTagClick = new EventEmitter<string>();

  handleClick(tag: string) {
    this.handleTagClick.emit(tag);
  }
}
