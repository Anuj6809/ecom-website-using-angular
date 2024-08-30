import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  updatedMsg:undefined|string;
  isShow:boolean=false;
  productData:undefined|product;
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    color: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern('https?://.+'),
    ]),
  });
  constructor(
    private route: ActivatedRoute,
    private product: ProductsService,
    private router:Router
  ) {}
  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');

    console.log(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        this.productData=data
        this.productForm.patchValue({
          name: data.name,
          price: data.price,
          category: data.category,
          description: data.description,
          color: data.color,
          image: data.image,
        });
      });
  }
  updateProduct(data:product) {
   
    console.warn(data);
    if(this.productData){
      data.id=this.productData.id;
    }
    
    this.product.updateData(data).subscribe((data)=>{
      this.isShow=true;
    })

    
   
  }
  goToHomePage(){
    this.router.navigate(['seller-home']);
  }
}
