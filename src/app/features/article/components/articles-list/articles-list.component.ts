import { DatePipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { LoadingState } from '../../../../core/models/loading-state.model';
import { ArticleListConfig } from '../../models/article-list-config.model';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { ArticlesPaginationComponent } from '../articles-pagination/articles-pagination.component';
import { ArticlesListItemComponent } from '../articles-list-item/articles-list-item.component';

@Component({
  selector: 'articles-list',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    ArticlesPaginationComponent,
    ArticlesListItemComponent,
  ],
  templateUrl: './articles-list.component.html',
})
export class ArticlesListComponent implements OnChanges {
  query!: ArticleListConfig;
  results: Article[] = [];
  currentPage = 1;
  totalPages: Array<number> = [];
  loading = LoadingState.NOT_LOADED;
  LoadingState = LoadingState;
  destroyRef = inject(DestroyRef);

  @Input() limit!: number;
  @Input() set config(config: ArticleListConfig) {
    console.log({ config });

    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  constructor(private articlesService: ArticleService) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = LoadingState.LOADING;
    this.results = [];

    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.articlesService
      .query(this.query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.loading = LoadingState.LOADED;
        this.results = data.articles;

        this.totalPages = Array.from(
          new Array(Math.ceil(data.articlesCount / this.limit)),
          (val, index) => index + 1
        );
      });
  }
}
