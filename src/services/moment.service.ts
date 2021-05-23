import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor(private http: HttpClient) { }


  save(body) {
    return this.http.post<any>(`/moment`, body);
  }

  update(body, id) {
    return this.http.put<any>(`/moment/${id}`, body);
  }

  delete(id) {
    return this.http.delete<any>(`/moment/${id}`);
  }

  get(userId) {
    return this.http.get<any>(`/moment/${userId}`);
  }

}
