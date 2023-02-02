import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { slideInOut } from './navbar.component.animations';

const mapRouteToPageTitle: Record<string, string> = {
  '/login': 'Belépés',
  '/signup': 'Regisztráció',
  '/shopping-cart': 'Bevásárló kosár',
  '/check-out': 'Megrendelés',
  '/my/orders': 'Megrendeléseim',
  '/my/account': 'Fiókom',
  '/admin/orders': 'Összes megrendelés',
  '/admin/orders/order-details': 'Megrenelés részletei',
  '/my/orders/order-details': 'Megrenelés részletei',
  '/admin/products': 'Összes termék',
  '/admin/products/product-details': 'Termék szerkesztése',
  '/admin/products/product-details/new': 'Termék hozzáadása',
}

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    slideInOut
  ]
})
export class NavbarComponent {
  currentPageTitle: string;
  nextPageTitle: string;
  pageTitleSliding: string = '';

  constructor(public authService: AuthService, public cartService: ShoppingCartService, router: Router) {
    this.currentPageTitle = this.getPageTitleFromUrl(router.url);
    this.nextPageTitle = this.currentPageTitle;
    router.events.subscribe(this.routerNavigationEventHandler)
  }

  pageTitleAnimationDone(event: any) {
    if (event.toState === 'outLeft') {
      this.currentPageTitle = this.nextPageTitle;
      this.pageTitleSliding = 'in';
    }
    else if (event.toState === 'outRight') {
      this.pageTitleSliding = '';
    }
  }

  private routerNavigationEventHandler = (event: any) => {
    if (event instanceof NavigationStart) {
      this.nextPageTitle = this.getPageTitleFromUrl(event.url);
      if (this.nextPageTitle !== this.currentPageTitle) {
        this.pageTitleSliding = 'out';
      }
    }
  }

  private getPageTitleFromUrl(url: string): string {
    let title = "Home";
    for (const route in mapRouteToPageTitle) {
      if(url.includes(route)) {
        title = mapRouteToPageTitle[route]
      }
    }
    return title;
  }
}
