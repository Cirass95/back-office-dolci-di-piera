import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category } from '../../interface/category.interface';
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
      title: ['',Validators.required],
      description: ['',Validators.required],
      category: [null,Validators.required],
      reviews: this.fb.array([]),
      price: ['',Validators.required],
      employee: ['',Validators.required],

    });
  }
  ngOnInit(): void {
    this.categories = this.dialogConfig.data.map((category: Category) => category.category);
  }

  get reviews() {
    return this.productForm.get('reviews') as FormArray;
  }

  addReview() {
    this.reviews.push(this.fb.control(null));
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
