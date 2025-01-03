import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductData, ProductList } from '../../../shared/interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  getProductsPaginated(page: number, elements: number): Observable<ProductList> {
    return this.http.get<ProductList>(`${environment.BASE_URL}/stores/${environment.STORE_ID}/products?page=${page}&elements=${elements}`);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.BASE_URL}/stores/${environment.STORE_ID}/products/${id}`);
  }

  createProduct(product: ProductData): Observable<any> {
    return this.http.post<any>(`${environment.BASE_URL}/stores/${environment.STORE_ID}/products`, product);
  }
}
