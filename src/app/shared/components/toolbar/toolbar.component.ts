import { CommonModule } from '@angular/common';
import { Component, OnDestroy, output } from '@angular/core';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButton } from 'primeng/togglebutton';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule, Toolbar, Button, IconField, InputIcon, InputTextModule, ToggleButton],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnDestroy {


  createProduct = output();
  searchProduct = output<string>();
  changeViewMode = output();
  destroyed$ = new Subject<void>();

  private searchSubject = new Subject<string>();

  searchTerm = '';

  addProduct() {
    this.createProduct.emit();
  }

  search() {
    this.searchSubject.next(this.searchTerm);
    this.searchSubject.pipe(
      takeUntil(this.destroyed$),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchValue) => this.searchProduct.emit(searchValue));
  }

  toggleViewMode() {
    this.changeViewMode.emit();
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchSubject.next('');
  }
  
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
