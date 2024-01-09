import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-articles-list-item',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './articles-list-item.component.html',
})
export class ArticlesListItemComponent {
  @Input() article!: Article;

  constructor() {}
}
