import { Component, inject, OnInit } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';
import { StoreInterface } from '../../shared/interface/store.interface';
import { CommonModule } from '@angular/common';
import { ToggleButton } from 'primeng/togglebutton';
import { InfoCardComponent } from "./components/info-card/info-card.component";
import { Product } from '../../shared/interface/product.interface';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ToggleButton, InfoCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private storeService = inject(StoreService);

  storeInfo !: StoreInterface;
  products: Product[] = [];
  gridLayout = true;
  totalReviews = 0;
  totalProducts = 0;
  totalCategories = 0;

  ngOnInit(): void {
    this.getStoreInformation();
    this.getProducts();
  }


  getStoreInformation() {
    return this.storeService.getStoreInformation().subscribe({
      next: (response) => {
        this.storeInfo = response;
      }
    });
  }

  getProducts() {
    return this.storeService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.totalReviews = this.storeService.getTotalReviews(this.products);
        this.totalProducts = this.storeService.getTotalProducts(this.products);
        this.totalCategories = this.storeService.getTotalCategories(this.products);
      }
    });
  }
  toggleViewMode(): void {
    this.gridLayout = !this.gridLayout;
  }

}
