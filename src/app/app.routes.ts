import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AllproductsComponent } from './pages/shopnow/allproducts/allproducts.component';
import { SingleProductComponent } from './pages/shopnow/single-product/single-product.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'allproducts', component: AllproductsComponent },
  { path: 'singleproduct' , component: SingleProductComponent},
  { path: 'contact' , component: ContactComponent},
  { path: '**', redirectTo: '' },
];
