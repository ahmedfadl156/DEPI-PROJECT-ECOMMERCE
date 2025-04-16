import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private apiurl = 'http://localhost/Test php/add_user.php'

constructor(private http: HttpClient) { }

adduser(user: any): Observable<any> {
  return this.http.post<any>(this.apiurl,user);
}


  // private apiUrl = 'http://localhost/Test php/add_user.php';

  // constructor(private http: HttpClient) { }

  // addUser(user: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, user);
  // }
}
