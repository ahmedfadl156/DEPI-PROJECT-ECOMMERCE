import { Component, model, OnInit} from '@angular/core';
import { GalleriaModule  } from 'primeng/galleria';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-single-product',
  imports: [GalleriaModule , DropdownModule , FormsModule , TabsModule , CommonModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent{
  images: any[] = [];
  selectedSize: any;
  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  constructor() { }

  ngOnInit() {
    this.addSampleImages();
  }

  addSampleImages() {
    this.images = [
      {
        itemImageSrc: "assets/Images/women-offer.png",
        thumbnailImageSrc: 'assets/Images/women-offer.png'
      },
      {
        itemImageSrc: "assets/Images/men-offer.png",
        thumbnailImageSrc: 'assets/Images/men-offer.png'
      },
      {
        itemImageSrc: "assets/Images/product-1.png",
        thumbnailImageSrc: 'assets/Images/product-1.png'
      },
      {
        itemImageSrc: "assets/Images/Product-2.png",
        thumbnailImageSrc: 'assets/Images/Product-2.png'
      }
    ];
  }
  
  addImages(newImages: any[]) {
    this.images = newImages;
  }


  sizes = [
    { label: 'Small', code: 's', value: 'small' },
    { label: 'Medium', code: 'm', value: 'medium' },
    { label: 'Large', code: 'l', value: 'large' }
];

}
