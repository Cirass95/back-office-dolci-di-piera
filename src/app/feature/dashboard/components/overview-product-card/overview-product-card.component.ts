import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-overview-product-card',
  standalone: true,
  imports: [CommonModule,CardModule],
  templateUrl: './overview-product-card.component.html',
  styleUrl: './overview-product-card.component.scss'
})
export class OverviewProductCardComponent {
  @Input() products: any[] = []; 
  totalProducts: number = 0;
  totalCategories: number = 0;
  totalReviews: number = 0;
  averagePrice: number = 0;

  ngOnInit(): void {
    this.calculateOverview();
  }

  calculateOverview(): void {
    this.totalProducts = this.products.length;
    console.log(this.products);
    // Totale categorie
    const categories = this.products.map(product => product.data.category);
    this.totalCategories = new Set(categories).size;
    console.log(this.totalCategories);

    // Totale recensioni
    this.totalReviews = this.products.reduce((acc, product) => acc + (product.data.reviews?.length || 0), 0);

    // Prezzo medio dei prodotti
    const totalPrice = this.products.reduce((acc, product) => acc + product.data.price, 0);
    this.averagePrice = this.totalProducts > 0 ? totalPrice / this.totalProducts : 0;
  }

}
