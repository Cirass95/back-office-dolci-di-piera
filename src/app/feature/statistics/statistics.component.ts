import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PolarChartComponent } from './components/chart/polar-chart.component';
import { ActivatedRoute } from '@angular/router';
import { InfoCardComponent } from '../../shared/components/info-card/info-card.component';
import { Category } from '../../shared/interface/category.interface';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, PolarChartComponent, InfoCardComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  private activateRouter = inject(ActivatedRoute)
  categories = this.activateRouter.snapshot.data['categories'] as Category[];
}
