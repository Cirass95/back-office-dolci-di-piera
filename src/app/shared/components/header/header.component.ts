import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems : MenuItem [] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
    { label: 'Prodotti', icon: 'pi pi-list', routerLink: '/products' },
    { label: 'Statistiche', icon: 'pi pi-chart-bar', routerLink: '/stats' },
    { label: 'Impostazioni', icon: 'pi pi-cog', routerLink: '/settings' },
  ];
}
