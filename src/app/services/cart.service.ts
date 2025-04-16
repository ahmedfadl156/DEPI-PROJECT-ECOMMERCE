import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class cartService {
  private itemcount = new BehaviorSubject<number>(0);
  itemcount$ = this.itemcount.asObservable();

  addtocart(){
    this.itemcount.next(this.itemcount.value + 1);
  }
}