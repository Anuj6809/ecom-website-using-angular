import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 constructor(private route:Router){

 }
 menuType:string='default'
 sellerName:string=''
 ngOnInit():void{
  this.route.events.subscribe((val:any)=>{
    if(val.url){
      console.warn(val.url)
      if(localStorage.getItem('seller')&& val.url.includes('seller')){
        console.warn('inside seller')
        this.menuType='seller'
        if(localStorage.getItem('seller')){
          let sellerStore=localStorage.getItem('seller');
          let sellerData=sellerStore && JSON.parse(sellerStore);
          this.sellerName=sellerData.name;

        }
      }else{
        console.warn('outside seller')
        this.menuType='default'
      }
    }

    
  })
 }
   
 logout(){
  localStorage.removeItem('seller');
  this.route.navigate(['/'])
 }
}
