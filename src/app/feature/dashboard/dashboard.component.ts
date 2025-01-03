import { Component, computed, inject, OnInit } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';
import { StoreInterface } from '../../shared/interface/store.interface';
import { CommonModule } from '@angular/common';
import { ToggleButton } from 'primeng/togglebutton';
import { InfoCardComponent } from "./info-card/info-card.component";
import { Product } from '../../shared/interface/product.interface';
import { Category } from '../../shared/interface/category.interface';
import { PolarChartComponent } from "./components/chart/polar-chart.component";
import { ConfigService } from '../../shared/services/config.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ToggleButton, InfoCardComponent, PolarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private storeService = inject(StoreService);
  private configService = inject(ConfigService);
  gridLayout = computed(() => this.configService.gridMode());

  storeInfo !: StoreInterface;
  products: Product[] = [];

  totalReviews = 0;
  totalProducts = 0;
  totalCategories = 0;
  totalEmployees = 0;
  categories: Category[] = [];

  ngOnInit(): void {
    this.getStoreInformation();
    this.getProducts();
    this.getCategories();
  }


  getStoreInformation() {
    return this.storeService.getStoreInformation().subscribe({
      next: (response) => {
        this.storeInfo = response;
        console.log(this.storeInfo);
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
        this.totalEmployees = this.storeService.getTotalEmployees(this.products);
      }
    });
  }


  toggleViewMode(): void {
    this.configService.gridMode.update((currentValue) => !currentValue);
  }

  getCategories() {
    this.storeService.getCategories().subscribe(
      {
        next: (categories) => this.categories = categories
      }
    )
  }

}
