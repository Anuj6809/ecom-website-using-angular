import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private apiUrl = 'http://localhost:3000/seller';
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: signup) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}`, {
        observe: 'response',
      })
      .subscribe((result:any) => {
        if (result && result.body && result.body.length) {
          this.isLoginError.emit(true);
        } else {
          this.http
            .post(this.apiUrl, data, { observe: 'response' })
            .subscribe((result) => {
              this.isSellerLoggedIn.next(true);
              localStorage.setItem('seller', JSON.stringify(result.body));
              this.router.navigate(['seller-home']);
            });
        }
      });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data: login) {
    console.warn(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body && result.body.length) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
          console.warn('logged in');
        } else {
          console.warn('login failed');
          this.isLoginError.emit(true);
        }
      });
  }
}
