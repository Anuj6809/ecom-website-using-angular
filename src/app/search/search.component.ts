import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: product[] | undefined;
  message: boolean = false;

  constructor(private product: ProductsService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);

    if (query) {
      this.product.searchProduct().subscribe((data) => {
        this.searchResult = data.filter((e) =>
          Object.values(e).some(val =>
            String(val).toLowerCase().includes(query.toLowerCase())
          )
        );

        // Set message to true if no search results are found
        this.message = this.searchResult.length === 0;
      });
    } else {
      this.searchResult = []; // Clear results if query is null
      this.message = true; // Show message since no query was provided
    }
  }
}
