import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signup } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  signInForm!:FormGroup;
  logInForm!:FormGroup;
  authError:string='';
  constructor(private seller:SellerService, private router:Router){}
  ngOnInit():void{
    this.signInForm= new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(3)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
    })
    this.logInForm= new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
    })
    this.seller.reloadSeller()
  }
  signInUpdate(data:signup):void{
    this.authError=''
    this.seller.userSignUp(data);
    this.seller.isLoginError.subscribe((error)=>{
      if(error){
        this.authError='user with this email already exist'
      }
    })
  }
  logInUpdate(data:login):void{
    this.authError=''
   this.seller.userLogin(data);
   this.seller.isLoginError.subscribe((error)=>{
    if(error){
      this.authError='Email or Password is not correct'
    }
   })

  }

  get name(){
    return this.signInForm.get('name') as FormControl;
  }
  get password(){
    return this.signInForm.get('password')  as FormControl;
  }
  get email(){
    return this.signInForm.get('email') as FormControl;
  }

  showlogin=false;
 showLogin(){
  this.showlogin=true;
 }
 showsignin(){
  this.showlogin=false;
 }
  
}
