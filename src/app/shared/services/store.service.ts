import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { StoreInterface } from '../interface/store.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private http = inject(HttpClient);

  getStoreInformation():Observable<StoreInterface> {
    return this.http.get<StoreInterface>(`${environment.BASE_URL}/stores/${environment.STORE_ID}`);
  }
  getProducts() {
    return this.http.get(`${environment.BASE_URL}/stores/${environment.STORE_ID}/products`);
  }
}
