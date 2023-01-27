import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsRouteAdmin {
  constructor(private router: Router) {}
  
  check() {
      return this.router.url.includes('admin');
  }
}