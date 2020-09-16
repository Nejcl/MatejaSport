import {Injectable} from '@angular/core';

const TOKEN = '';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  resetToken(): void {
    localStorage.removeItem(TOKEN);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }
}
