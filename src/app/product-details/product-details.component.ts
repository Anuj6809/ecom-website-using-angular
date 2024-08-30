import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product,cart } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData:undefined|product;
  constructor(
    private activateRoute: ActivatedRoute,
    private product: ProductsService
  ) {}
  ngOnInit(): void {
    const productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId == item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if(user){
          let userId=user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result)=>{
            let items=result.filter((item)=> productId?.toString()===item.productId?.toString())
            if(items.length){
              this.cartData=items[0]
              this.removeCart=true
            }
          })
        }
      });
  }

  handlequantity(val: string) {
    if (val === 'plus' && this.productQuantity < 20) {
      this.productQuantity += 1;
    } else if (val === 'minus' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
  }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart=true
      }else{
        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id
        console.log(userId)
        let cartData:cart={
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
       this.product.addToCart(cartData).subscribe((result)=>{
        if(result){
          this.product.getCartList(userId);
          this.removeCart=true
        }
       })
      }
    }
  }
  removeToCart(productId:number){
    if(!localStorage.getItem('user')){
      this.product.removeCartItem(productId)
    
      this.productQuantity=1
    }else{
      let user=localStorage.getItem('user');
      let userId=user &&JSON.parse(user).id
      console.warn(this.cartData);
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        if(result){
          this.product.getCartList(userId)
        }
      })
    }
    this.removeCart=false
    
    this.productQuantity=1
    
  }
}
