import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ToggleButton } from 'primeng/togglebutton';
import { StoreService } from '../../services/store.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Menubar, ToggleButton, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private configService = inject(ConfigService);
  darkMode = computed(() => this.configService.darkMode);

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
    { label: 'Prodotti', icon: 'pi pi-list', routerLink: '/products' },
  ];

  toggleDarkMode() {
    this.configService.toggleDarkMode();
  }
}
