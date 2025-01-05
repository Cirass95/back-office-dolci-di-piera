import { Component, computed, inject, OnInit } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';
import { StoreInterface } from '../../shared/interface/store.interface';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from "../../shared/components/info-card/info-card.component";
import { Product, ProductData } from '../../shared/interface/product.interface';
import { Category } from '../../shared/interface/category.interface';
import { PolarChartComponent } from "../statistics/components/chart/polar-chart.component";
import { ConfigService } from '../../shared/services/config.service';
import { ToolbarComponent } from "../../shared/components/toolbar/toolbar.component";
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductService } from '../products/services/product.service';
import { CreateProductComponent } from '../../shared/components/create-product/create-product.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ProductCardComponent,InfoCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private storeService = inject(StoreService);
  private configService = inject(ConfigService);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);


  gridLayout = computed(() => this.configService.gridMode());
  storeInfo !: StoreInterface;
  products: Product[] = [];
  totalReviews = 0;
  totalProducts = 0;
  totalCategories = 0;
  totalEmployees = 0;
  categories: Category[] = [];

  serchedList: Product[] = [];

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    return this.storeService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.serchedList = response;
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

  deleteProduct(product: string) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare il prodotto?',
      header: 'Elimina Prodotto',
      acceptButtonProps: { label: 'Elimina', icon: 'pi pi-trash', severity: 'danger', },
      rejectButtonProps: { label: 'Annulla', icon: 'pi pi-times', severity: 'secondary' },
      accept: () => {
        this.productService.deleteProduct(product).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Eliminazione Effettuata', detail: 'Prodotto eliminato con successo' });
            this.getProducts();
          }
        });
      },
    })
  }

  createProduct() {
    const ref = this.dialogService.open(CreateProductComponent, {
      header: 'Crea Prodotto',
      modal: true,
      closable: true,
      data: this.categories
    });

    ref.onClose.subscribe((product: ProductData) => {
      if (product) {
        this.productService.createProduct(product).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Prodotto Creato', detail: 'Prodotto creato con successo' });
            this.getProducts();
          }
        });
      }
    });
  }

  searchProduct(searchValue: string) {
    this.serchedList = this.products;
    this.serchedList = this.serchedList.filter((product) => product.data.title.toLowerCase().includes(searchValue.toLowerCase()));
  }

}
