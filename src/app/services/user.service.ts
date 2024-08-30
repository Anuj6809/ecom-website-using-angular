import { EventEmitter, Injectable } from '@angular/core';
import { login, signup } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }
  invalidUserAuth= new EventEmitter <boolean>(false)
  userSignUp(user:signup){
    this.http.get<signup[]>(`http://localhost:3000/users?email=${user.email}`)
    .subscribe((existingUser)=>{
      if(existingUser && existingUser.length>0){
        alert("this user is already exist")
      }else{
        this.http.post('http://localhost:3000/users',user,{observe:'response'})
    .subscribe((result)=>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
      }
    })
    
  }

  userAuth(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
  userLogin(data:login){
    console.warn(data);
    
    this.http.get<signup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'})
    .subscribe((result)=>{
      if(result && result.body && result.body.length>0){
        const user = result.body[0];
        if(user && user.email===data.email && user.password===data.password){
          localStorage.setItem('user',JSON.stringify(result.body[0]));
          this.router.navigate(['/'])
          this.invalidUserAuth.emit(false)
        }else{
          this.invalidUserAuth.emit(true)
        }
      
      }else{
        
         this.invalidUserAuth.emit(true)
      }
    })
  }
}
