import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Card } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { Product} from '../../../../shared/interface/product.interface';
import { Button } from 'primeng/button';
import { Popover } from 'primeng/popover';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, Card , ChipModule, Button, Popover,DividerModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
  deleteProduct = output<string>();
  showDetails = false;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  delete(): void {
    this.deleteProduct.emit(this.product().id);
  }
}
