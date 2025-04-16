import { Component, OnInit, ViewChild, ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../services/products.service'
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [MatSliderModule, HttpClientModule, CommonModule, MatPaginatorModule , AnimateOnScrollModule , SliderModule, FormsModule],
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AllproductsComponent implements OnInit {
  startvalue = 100;
  endvalue = 1000;
  products: any[] = [];
  displayedProducts: any[] = [];
  isLoading = true;
  itemsToShow = 16;
  itemsPerPage = 12;
  currentPage = 0;

  @ViewChild('productList', { static: false }) productList!: ElementRef;

  user = { name: '', email: '' };
  message: string = '';

  constructor(private productsService: ProductsService , private userService: UserService) {}

  // onSubmit() {
  //   this.userService.addUser(this.user).subscribe(response => {
  //     if (response.status === 'success') {
  //       this.message = 'User added successfully!';
  //       this.user = { name: '', email: '' }; 
  //     } else {
  //       this.message = 'Error adding user.';
  //     }
  //   }, error => {
  //     this.message = 'Server error. Please try again.';
  //   });
  // }

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        console.log('Fetched Products:', data);
        this.products = data;
        this.updateDisplayedProducts();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    });
  }

  updateDisplayedProducts() {
    const startIndex = this.currentPage * this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.updateDisplayedProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadMore(){
    this.itemsToShow += 8;
    this.displayedProducts = this.products.slice(0 , this.itemsToShow);
  }
}
