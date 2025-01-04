import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { StoreInterface } from '../interface/store.interface';
import { Product, } from '../interface/product.interface';
import { Category } from '../interface/category.interface';

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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.BASE_URL}/stores/${environment.STORE_ID}/stats/categories`);
  }

}
