import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { cartService } from '../../services/cart.service';

@Component({
  selector: 'app-arrivals',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './arrivals.component.html',
  styleUrl: './arrivals.component.scss'
})
export class ArrivalsComponent implements OnInit {
  products: any[] = [];
  displayedProducts: any[] = [];
  isLoading = true;
  itemsToShow = 8;


  constructor(private productsService: ProductsService , private cartService: cartService) {}


  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        console.log('Fetched Products:', data);
        this.products = data;
        this.displayedProducts = this.products.slice(0 , this.itemsToShow);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    });
  }

  loadMore(){
    this.itemsToShow += 8;
    this.displayedProducts = this.products.slice(0 , this.itemsToShow);
  }
}