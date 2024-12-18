import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { StoreInterface } from '../interface/store.interface';
import { ProductData, Product } from '../interface/product.interface';
import { CategoryInterface } from '../interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private http = inject(HttpClient);

  getStoreInformation(): Observable<StoreInterface> {
    return this.http.get<StoreInterface>(`${environment.BASE_URL}/stores/${environment.STORE_ID}`);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.BASE_URL}/stores/${environment.STORE_ID}/products`);
  }

  getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(`${environment.BASE_URL}/stores/${environment.STORE_ID}/stats/categories`);
  }

  getTotalProducts(products: Product[]): number {
    return products.length;
  }
  getTotalReviews(products: Product[]): number {
    return products.reduce((acc, product) => acc + (product.data.reviews?.length || 0), 0);
  }

  getTotalEmployees(products: Product[]): number {
    const employ = products.map(product => product.data.employee);
    return new Set(employ).size;
  }

  getTotalCategories(products: Product[]): number {
    const categories = products.map(product => product.data.category);
    return new Set(categories).size;
  }


}
