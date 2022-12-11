import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //send data to the server
  postUser(data: any) {
    return this.http.post<any>('http://localhost:3000/newUser/', data);
  }
  // Get All users
  getUser() {
    return this.http.get('http://localhost:3000/newUser/');
  }
  // Update User
  putUser(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/newUser/' + id, data);
  }
  // Delete user
  deleteUser(id: number) {
    return this.http.delete<any>('http://localhost:3000/newUser/' + id);
  }
}
