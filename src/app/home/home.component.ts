import { Component,OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductsService } from '../services/products.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent {
  popularProduct:undefined|product[];
  allProduct:undefined|product[];
  constructor(private product:ProductsService){}
  ngOnInit():void{
   this.product.popularProduct().subscribe((data)=>{
    console.warn(data);
    this.popularProduct=data;
    let user = localStorage.getItem('user');
    if(user){
      let userId=user && JSON.parse(user).id;
      this.product.getCartList(userId);
    }
   })
   this.product.getProductCard().subscribe((data)=>{
    this.allProduct=data;
   })
  }
  
}
