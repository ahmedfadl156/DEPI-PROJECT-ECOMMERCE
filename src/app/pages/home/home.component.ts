import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ArrivalsComponent } from '../../components/arrivals/arrivals.component';
import { OffersComponent } from '../../components/offers/offers.component';
import { TopsellersComponent } from '../../components/topsellers/topsellers.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ArrivalsComponent,
    OffersComponent,
    TopsellersComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
