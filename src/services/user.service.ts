import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  save(body) {
      return this.http.post<any>(`/users/register`, body);
  }

  login(email, password) {
    let body = {
      email,
      password
    }
    return this.http.post<any>(`/users/login`, body);
  }
}
