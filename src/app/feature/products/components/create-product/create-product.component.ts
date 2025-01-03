import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from '../../../../shared/interface/category.interface';
import { Select } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule, TextareaModule, FloatLabelModule, Select],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit {

  private fb = inject(FormBuilder);
  private dialogConfig = inject(DynamicDialogConfig);
  private dialogRef = inject(DynamicDialogRef);
  productForm!: FormGroup;
  categories: Category[] = [];



  constructor() {
    this.productForm = this.fb.group({
      title: ['',],
      description: [''],
      category: [null],
      reviews: this.fb.array([this.fb.control('')]),
      price: [''],
      employee: [''],

    });
  }
  ngOnInit(): void {
    this.categories = this.dialogConfig.data;
  }

  get reviews() {
    return this.productForm.get('reviews') as FormArray;
  }

  addReview() {
    this.reviews.push(this.fb.control(''));
    console.log(this.reviews);
  }

  removeReview(index: number) {
    this.reviews.removeAt(index);
  }

  addProduct() {
    this.dialogRef.close(this.productForm.value);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
