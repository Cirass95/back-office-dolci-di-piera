import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Product } from '../../shared/interface/product.interface';
import { ProductService } from './services/product.service';
import { PaginatorModule } from 'primeng/paginator';
import { Skeleton } from 'primeng/skeleton';
import { finalize } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateProductComponent } from '../../shared/components/create-product/create-product.component';
import { StoreService } from '../../shared/services/store.service';
import { Category } from '../../shared/interface/category.interface';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, PaginatorModule, Skeleton],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private confirmationService = inject(ConfirmationService);
  private storeService = inject(StoreService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);

  products: Product[] = [];
  page = 1;
  totalProducts = 0;
  elementForPage = 5;
  loading: boolean = false;
  categories: Category[] = [];




  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.loading = true;
    this.products = [];
    return this.productService.getProductsPaginated(this.page, this.elementForPage).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (response) => {
        this.products = response.list;
        this.totalProducts = response.length;
      }
    });
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.getProductList();
  }

  deleteProduct(event: Event, product: string) {
    this.confirmationService.confirm({
      message: 'Sei sicuro di voler eliminare il prodotto?',
      header: 'Elimina Prodotto',
      acceptButtonProps: { label: 'Elimina', icon: 'pi pi-trash', severity: 'danger', },
      rejectButtonProps: { label: 'Annulla', icon: 'pi pi-times', severity: 'secondary' },
      accept: () => {
        this.productService.deleteProduct(product).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Eliminazione Effettuata', detail: 'Prodotto eliminato con successo' });
            this.getProductList();
          }
        });
      },
    })
  }

  createProduct() {
    this.dialogService.open(CreateProductComponent, {
      header: 'Crea Prodotto',
      modal: true,
      closable: true,
      data: this.categories
    });
  }
}
