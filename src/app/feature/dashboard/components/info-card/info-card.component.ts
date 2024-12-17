import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [Card],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {
  @Input() value: number = 0
  @Input() label: string = ''

}
