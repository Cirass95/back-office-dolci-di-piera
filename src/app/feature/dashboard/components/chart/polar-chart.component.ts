import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CategoryInterface } from '../../../../shared/interface/category.interface';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-polar-chart',
  standalone: true,
  imports: [CommonModule, ChartModule,Card],
  providers: [TitleCasePipe],
  templateUrl: './polar-chart.component.html',
  styleUrl: './polar-chart.component.scss'
})
export class PolarChartComponent implements OnInit {
  @Input() categories: CategoryInterface[] = []
  data: any;
  options: any;

  private titleCasePipe = inject(TitleCasePipe);
  generateColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`);
    }
    return colors;
  }

  ngOnInit(): void {
    const colors = this.generateColors(this.categories.length);

    this.data = {
      labels: this.categories.map(value => this.titleCasePipe.transform(value.category)),
      datasets: [
        {
          label: 'Numero di Prodotti',
          data: this.categories.map(value => value.numberOfProducts),
          backgroundColor: colors,
        }
      ]
    };
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#495057', // Colore della legenda
            font: {
              size: 14,
            },
          },
        },
      },
      scales: {
        r: {
          ticks: {
            display: true, // Mostra i valori sulle scale
            color: '#495057', // Colore delle etichette
            font: {
              size: 12,
            },
          },
          grid: {
            color: '#E0E0E0', // Colore della griglia
          },
          angleLines: {
            color: '#E0E0E0', // Linee radiali
          },
        },
      },
    };
  }
}


