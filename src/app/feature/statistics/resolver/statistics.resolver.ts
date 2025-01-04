import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { StoreService } from '../../../shared/services/store.service';
import { Observable } from 'rxjs';
import { Category } from '../../../shared/interface/category.interface';

export const statisticsResolver: ResolveFn<Observable<Category[]>> = () => {
  const storeService = inject(StoreService)
  return storeService.getCategories();
};
