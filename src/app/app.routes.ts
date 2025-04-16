import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AllproductsComponent } from './pages/shopnow/allproducts/allproducts.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'allproducts', component: AllproductsComponent },
  { path: '**', redirectTo: '' },
];
