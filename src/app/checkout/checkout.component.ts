import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartData:undefined|cart[]
  totalPrice:undefined|number;
  // orderMsg:any|undefined
checkoutForm:FormGroup= new FormGroup({
  email: new FormControl(''),
  address: new FormControl(''),
  contact: new FormControl('')
})

get email(){
 return this.checkoutForm.get('email') as FormControl
}

get address(){
  return this.checkoutForm.get('address') as FormControl
}

get Contact(){
  return this.checkoutForm.get('contact') as FormControl
}
constructor(private product:ProductsService, private router:Router){}
ngOnInit():void{
  this.product.currentCart().subscribe((result)=>{
    this.cartData=result
    let price=0
    result.forEach((item)=>{
      if(item.quantity){
        price = price + (+item.price * +item.quantity)
      }
    })
    this.totalPrice=price+(price/10)+100-(price/10)
    console.warn(this.totalPrice);
    
  })
}
checkOut(data:{email:string,address:string,contact:string}){
   let user =localStorage.getItem('user')
   let userId=user && JSON.parse(user).id
   if(this.totalPrice){
    let orderData:order={
      ...data,
      totalPrice:this.totalPrice,
      userId,
      id:undefined,
    }
    this.cartData?.forEach((item)=>{
   setTimeout(()=>{
    item.id && this.product.deleteCartItems(item.id)
   },600)
    })
    this.product.orderNow(orderData).subscribe((result)=>{
      Swal.fire('Congratulations', 'Your order have been confirmed!', 'success').then((result)=>{
        if(result.isConfirmed){
        
           this.router.navigate(['my-order'])
           
          
        
       }
      })
      
    })
   }
 
}
}
