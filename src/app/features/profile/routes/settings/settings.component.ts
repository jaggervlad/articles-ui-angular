import { UserService } from './../../../../core/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, inject, DestroyRef, Inject } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styles: ``,
})
export class SettingsComponent implements OnInit {
  user!: User;
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService
      .getCurrentUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ user }) => {
          this.user = user;

          console.log(this.user);
        },
        error: (err) => {
          void this.router.navigate(['/']);
        },
      });
  }
}
