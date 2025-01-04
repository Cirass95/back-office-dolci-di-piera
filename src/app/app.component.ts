import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { StoreService } from './shared/services/store.service';
import { StoreInterface } from './shared/interface/store.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ConfirmDialog, ToastModule],
  providers: [ConfirmationService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private storeService = inject(StoreService);
  storeInfo!: StoreInterface;
  ngOnInit(): void {
    this.getStoreInformation();
  }

  getStoreInformation() {
    return this.storeService.getStoreInformation().subscribe({
      next: (response) => {
        this.storeInfo = response;
      }
    });
  }
}
