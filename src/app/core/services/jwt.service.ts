import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: string) {
    window.localStorage.setItem('jwtToken', token);
  }

  destoyToken(): void {
    window.localStorage.removeItem('jwtToken');
  }
}
