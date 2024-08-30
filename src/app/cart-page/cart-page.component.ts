import { Component,OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { cart, priceSummary } from '../data-type';
import { faTaxi } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData:undefined|cart[]
  priceSummary:priceSummary={
    price:0,
    discount:0,
    delivery:0,
    tax:0,
    total:0
}
  constructor(private cart:ProductsService, private router:Router){

  }
ngOnInit():void{
  this.loadDetails()
}

removeToCart(cartId:number | undefined){
cartId && this.cart.removeToCart(cartId).subscribe((result)=>{
 this.loadDetails()
})
}
loadDetails(){
  this.cart.currentCart().subscribe((result)=>{
    this.cartData=result 
    let price=0
    result.forEach((item)=>{
      if(item.quantity){
        price = price + (+item.price * +item.quantity)
      }
    })

    this.priceSummary.price=price;
    this.priceSummary.discount=price/10;
    this.priceSummary.tax=price/10;
    this.priceSummary.delivery=100
    this.priceSummary.total=price+(price/10)+100-(price/10)
    if(!this.cartData.length){
      this.router.navigate([""])
    }
  })

}

checkout(){
  this.router.navigate(["/checkout"])
}
}
