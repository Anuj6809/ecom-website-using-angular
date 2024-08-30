import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string|undefined;
  productForm:FormGroup= new FormGroup({
   name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
   price:new FormControl('',[Validators.required,Validators.pattern('^[0-9]*$')]),
   color:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
   description:new FormControl('',[Validators.required,Validators.minLength(10)]),
   category:new FormControl('',[Validators.required,Validators.minLength(3)]),
   image:new FormControl('',[ Validators.required,Validators.pattern('https?://.+')])
  }) 
  constructor(private product:ProductsService){

  }
  ngOnInit(){
  
  }
  addProductForm(data:product){
    console.warn(data)
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result);
      if(result){
       this.addProductMessage="Product is successfully added"
      }
      this.productForm.reset()
      setTimeout(()=>{this.addProductMessage=undefined},3000)
     
    })
  }
  

}
