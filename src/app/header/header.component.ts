import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('searchResults') searchResults!: ElementRef;

  searchResult: undefined | product[];
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  message: boolean = false;
 cartItems=0;
  constructor(private route: Router, private product: ProductsService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      
   
      if (val instanceof NavigationEnd) {
        console.log(val.url);
        
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn('inside seller');
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData?.name || '';
        }else if(localStorage.getItem('user')){
          this.menuType = 'user';
         let userStore =localStorage.getItem('user');
         let userData = userStore && JSON.parse(userStore)
         this.userName=userData?.name || ''
        } else {
          console.warn('outside seller');
          this.menuType = 'default';
        }
      }
    });
    let cardData=localStorage.getItem('localCart')
    if(cardData){
      this.cartItems=JSON.parse(cardData).length
    }
    this.product.cartData.subscribe((cartdata)=>{
      
     this.cartItems= cartdata.length;
    })
  }

  ngAfterViewInit(): void {
    // You can safely access ViewChild elements here if needed
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate(["/user-auth"])
    this.product.cartData.emit([])
  }

  searchProduct(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.trim();

    if (query) {
      this.product.getProductCard().subscribe((data) => {
        this.searchResult = data.filter((e) =>
          Object.values(e).some((val) =>
            String(val).toLowerCase().includes(query.toLowerCase())
          )
        );
        this.message = this.searchResult.length === 0; // Show 'No records found' message if no results
        console.warn(this.searchResult);
      });
    } else {
      this.searchResult = [];
      this.message = true; // Show 'No records found' message if input is empty
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInsideInput = this.searchInput?.nativeElement?.contains(
      event.target
    );
    const clickedInsideResults = this.searchResults?.nativeElement?.contains(
      event.target
    );

    if (!clickedInsideInput && !clickedInsideResults) {
      this.searchResult = []; // Clear the search results
      if (this.searchInput) {
        this.searchInput.nativeElement.value = ''; // Clear the input value
      }
    }
  }

  searchProductPage(val: string) {
    console.warn(val);
    this.route.navigate(['/search', val]);
  }
}


