import { Component, OnInit} from '@angular/core';
import { FormGroup,FormControl,FormControlName, Validators } from '@angular/forms';
import { cart, login, product, signup } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  authErrorMsg:string=''
 userSignForm:FormGroup= new FormGroup({
  name: new FormControl ('',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
  email:new FormControl('',[Validators.required,Validators.email]),
  password: new FormControl('',[Validators.required,Validators.minLength(6)])
 })

 userLoginForm: FormGroup= new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password: new FormControl('',[Validators.required,Validators.minLength(6)])
 })
 get loginEmail(){
  return this.userLoginForm.get("email") as FormControl; 
 }
 get loginPassword(){
  return this.userLoginForm.get("password") as FormControl; 
 }
 get name(){
  return this.userSignForm.get("name") as FormControl; 
 }
 get email(){
  return this.userSignForm.get("email") as FormControl; 
 }
 get password(){
  return this.userSignForm.get("password") as FormControl; 
 }
 constructor(private user:UserService, private product:ProductsService){}
 show:boolean=false;
 ngOnInit():void{
  this.user.userAuth();
 }
 submit(data:signup){
   console.warn(data);
   this.user.userSignUp(data)
 }

 userLogin(data:login){
  console.log(data)
  this.user.userLogin(data)
  this.user.invalidUserAuth.subscribe((result)=>{
    if(result){
       this.authErrorMsg="Please enter valid user details"
    }else{
      this.localCartToRemoteCart()
    }
  })
 }
 showLogin(){
   this.show=false

 }
 showSignup(){
   this.show=true
 }
 localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user= localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[]=JSON.parse(data);
     
      cartDataList.forEach((product:product,index)=>{
         let cartData:cart={
          ...product,
          productId:product.id,
          userId
         }
         delete cartData.id;
         setTimeout(()=>{
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
               console.warn("item stored in database")
            }
           })
           if(cartDataList.length===index+1){
            localStorage.removeItem('localCart')
           }
         },500)
         
      })
    }
    setTimeout(()=>{
      this.product.getCartList(userId)
    },2000)
   
 }

}
