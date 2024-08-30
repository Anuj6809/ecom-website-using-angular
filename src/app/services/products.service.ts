import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartData= new EventEmitter<product[] | []>()
  constructor(private http:HttpClient) { }
  addProduct(data:product){
    return this.http.post('http://localhost:3000/products',data)
  }
  productList(){
    return this.http.get<product[]>('http://localhost:3000/products')
  }
  deleteProduct(id:number){
   return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id:string){
   return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  updateData(data:product){
    return this.http.put<product>(`http://localhost:3000/products/${data.id}`,data)
  }

  popularProduct(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3')
  }
  
  getProductCard(){
    return this.http.get<product[]>('http://localhost:3000/products')
  }

  suggestedProduct(querry:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${querry}`)
  }
  searchProduct() {
    return this.http.get<product[]>('http://localhost:3000/products')
 }

 localAddToCart(data:product){
  let cartData =[]
  let localCart = localStorage.getItem('localCart')
  if(!localCart){
    localStorage.setItem('localCart',JSON.stringify([data]));
    this.cartData.emit([data])
  }else{
    cartData=JSON.parse(localCart)
    cartData.push(data)
    localStorage.setItem('localCart',JSON.stringify(cartData))
    this.cartData.emit(cartData)
  }
 
 }

 removeCartItem(productId:number){
  let cartData=localStorage.getItem('localCart');
  if(cartData){
    let items:product[]=JSON.parse(cartData);
    items=items.filter((item:product)=>productId!==item.id)
    localStorage.setItem('localCart',JSON.stringify(items))
    this.cartData.emit(items)
  }
  
 }

 addToCart(cartData:cart){
  return this.http.post('http://localhost:3000/cart',cartData)
 }

 getCartList(userId:number){
   return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,
    {observe:'response'}).subscribe((result)=>{
      console.warn(result);
      
      console.warn(result.body);
      
      if(result && result.body){
        this.cartData.emit(result.body)
      }
    })

 }

 removeToCart(cartId:number){
  return this.http.delete(`http://localhost:3000/cart/${cartId}`)
 }

 currentCart(){
  let user=localStorage.getItem('user');
  let userData=user && JSON.parse(user);
  return this.http.get<cart[]>(`http://localhost:3000/cart?userId=${userData.id}`)
 }

 orderNow(data:order){
  return this.http.post('http://localhost:3000/orders',data)
 }

 orderList(){
  let user = localStorage.getItem('user');
  let userData= user && JSON.parse(user)
  return this.http.get<order[]>(`http://localhost:3000/orders?userId=${userData.id}`)
 }

 deleteCartItems(cartId:number){
  return this.http.delete(`http://localhost:3000/cart/${cartId}`,{observe:'response'})
  .subscribe((result)=>{
    if(result){
      this.cartData.emit([])
    }
  })
 }

 cancelMyOrder(orderId:number){
  return this.http.delete(`http://localhost:3000/orders/${orderId}`)
 }
}
