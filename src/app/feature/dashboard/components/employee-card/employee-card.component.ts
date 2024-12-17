import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CardModule, CommonModule, SkeletonModule ,DividerModule],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss'
})
export class EmployeeCardComponent {
  @Input() employees: string[] = [];
}
