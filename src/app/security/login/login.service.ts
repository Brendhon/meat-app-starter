import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

import { MEAT_API } from "../../app.api";
import { User } from "./user.model";

import { NavigationEnd, Router } from "@angular/router";

@Injectable()
export class LoginService {
  user: User;
  lastUrl: string;

  constructor(
    private http: HttpClient,
    private route: Router,
  ) {
    this.route.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
      )
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`, {
      email: email,
      password: password,
    }).pipe(tap((user) => this.user = user));
  }

  handleLogin(path: string = this.lastUrl) {
    this.route.navigate(["/login", btoa(path)]); // Transformando em Base 64 para a URL ser mais amigável
  }

  logout() {
    this.user = undefined;
  }
}
