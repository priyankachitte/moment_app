import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  imageUpload(imageForm: FormData) {
    return this.http.post<any>(`/api/v1/upload`, imageForm);
  }
}
