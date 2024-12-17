import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ToggleButton } from 'primeng/togglebutton';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, Menubar, ToggleButton, FormsModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input({ required: true }) shopName: string = '';
  darkMode: boolean = false;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
    { label: 'Prodotti', icon: 'pi pi-list', routerLink: '/products' },
    { label: 'Statistiche', icon: 'pi pi-chart-bar', routerLink: '/stats' },
    { label: 'Impostazioni', icon: 'pi pi-cog', routerLink: '/settings' },
  ];

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
}
}
