import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, computed, inject, input, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Category } from '../../../../shared/interface/category.interface';
import { Card } from 'primeng/card';
import { ConfigService } from '../../../../shared/services/config.service';
import { effect } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-polar-chart',
  standalone: true,
  imports: [CommonModule, ChartModule, Card],
  providers: [TitleCasePipe],
  templateUrl: './polar-chart.component.html',
  styleUrl: './polar-chart.component.scss'
})
export class PolarChartComponent {

  categories = input<Category[]>([]);
  private titleCasePipe = inject(TitleCasePipe);
  private configService = inject(ConfigService);

  darkMode = computed(() => this.configService.darkMode());
  chartData = computed(() => this.setChartData());
  chartOptions = computed(() => this.setChartOptions());
  isMobile = computed(() => this.configService.isMobile());


  x = effect(() => {
    this.chartData = computed(() => this.setChartData());
    this.chartOptions = computed(() => this.setChartOptions());
  });

  generateColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`);
    }
    return colors;
  }

  setChartData() {
    const colors = this.generateColors(this.categories().length);
    return {
      labels: this.categories().map(value => this.titleCasePipe.transform(value.category)),
      datasets: [
        {
          label: 'Numero di Prodotti',
          data: this.categories().map(value => value.numberOfProducts),
          backgroundColor: colors,
        }
      ]
    };
  }

  setChartOptions(): ChartOptions<'polarArea'> {
    return {
      responsive: true,
      maintainAspectRatio: true,

      plugins: {
        legend: {
          display: true,
          position: this.isMobile() ? 'bottom' : 'left',
          labels: {
            color: this.darkMode() ? '#FFF' : '#000',
          },
        },
      },
      scales: {
        r: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
          pointLabels: {
            display: false,
          },
        },
      },
    };
  }


}


