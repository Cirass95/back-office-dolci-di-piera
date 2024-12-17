import { Component, inject, OnInit } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';
import { StoreInterface } from '../../shared/interface/store.interface';
import { EmployeeCardComponent } from "./components/employee-card/employee-card.component";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ViewModeEnum } from '../../shared/enum/view-mode.enum';
import { OverviewProductCardComponent } from './components/overview-product-card/overview-product-card.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, EmployeeCardComponent ,OverviewProductCardComponent, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private storeService = inject(StoreService);
  storeInfo !: StoreInterface;
  products = [];
  employees: string[] = [];
  viewMode: ViewModeEnum = ViewModeEnum.GRID;
  VIEW_MODE = ViewModeEnum;
  ngOnInit(): void {
    this.getStoreInformation();
    this.getProducts();
  }


  getStoreInformation() {
    return this.storeService.getStoreInformation().subscribe({
      next: (response) => {
        this.storeInfo = response;
        this.employees = response.employees;
      }
    });
  }

  getProducts() {
    return this.storeService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response;
      }
    });
  }
  toggleViewMode(mode: ViewModeEnum): void {
    this.viewMode = mode;
  }

}
