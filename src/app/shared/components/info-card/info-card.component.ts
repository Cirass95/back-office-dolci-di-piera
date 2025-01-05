import { Component, input, Input } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [Card],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {

  value = input<number>(0);
  label = input<string>('');
}
