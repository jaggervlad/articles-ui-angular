import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Article } from '../../models/article.model';
import { User } from '../../../../core/models/user.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { catchError, combineLatest, throwError } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './article.component.html',
  styles: ``,
})
export class ArticleComponent implements OnInit {
  article!: Article;
  currentUser!: User | null;
  canModify: boolean = false;

  isSubmitting = false;
  isDeleting = false;
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly articlesService: ArticleService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];

    combineLatest([
      this.articlesService.get(slug),
      this.userService.currentUser,
    ])
      .pipe(
        catchError((error) => {
          void this.router.navigate(['/']);
          return throwError(() => error);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(([article, currentUser]) => {
        this.article = article;
        this.currentUser = currentUser;
        this.canModify = currentUser?.username === article.author.username;
      });
  }
}
