import { Component,OnInit} from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  faTrash=faTrash;
  faEdit = faEdit;
  productList:undefined|product[]
  productMsg:undefined|string
  constructor(private product:ProductsService){

  }
 
  ngOnInit():void{
    this.list()

  }
  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      this.list();
      if(result){
        this.productMsg="Product deleted succesfully"
      }
      setTimeout(() => {this.productMsg=undefined}, 3000);
    })
    
  }

  list(){
    this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.productList=result
   })
  }

}
