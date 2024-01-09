import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ArticleListConfig } from '../../models/article-list-config.model';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IfAuthenticatedDirective } from '../../../../shared/directives/if-authenticated.directive';
import { NgClass } from '@angular/common';
import { ArticlesListComponent } from '../../components/articles-list/articles-list.component';
import { TagsFilterComponent } from './tags-filter/tags-filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IfAuthenticatedDirective,
    NgClass,
    ArticlesListComponent,
    RouterLink,
    TagsFilterComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;
  listConfig: ArticleListConfig = { type: 'all', filters: {} };
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated
      .pipe(
        tap((isAuth) => {
          if (isAuth) {
            this.setListTo('feed');
          } else {
            this.setListTo('all');
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((isAuth: boolean) => (this.isAuthenticated = isAuth));
  }

  setListTo(type: string = '', filters: Object = {}): void {
    if (type === 'feed' && !this.isAuthenticated) {
      void this.router.navigate(['/']);
      return;
    }

    this.listConfig = { type, filters };
  }

  handleChangeTag(tag: string) {
    this.setListTo('all', { tag: tag });
  }
}
