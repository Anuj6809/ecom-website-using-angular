import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { OnInit } from '@angular/core';
import { order } from '../data-type';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent {
  orderList: undefined | order[];
  constructor(private product: ProductsService) {}
  ngOnInit(): void {
    this.getOrderList();
  }
  cancleOrder(orderId: number | undefined) {
    console.warn(orderId);
    
    orderId && this.product.cancelMyOrder(orderId).subscribe((result)=>{
      this.getOrderList();
    })
    
  }

  getOrderList() {
    this.product.orderList().subscribe((result) => {
      console.warn(result);
      this.orderList = result;
    });
  }
}
