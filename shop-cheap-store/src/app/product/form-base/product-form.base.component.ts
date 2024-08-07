import { FormGroup } from "@angular/forms";
import { MASKS } from "ngx-brazil";
import { ValidationMessages, GenericValidator, DisplayMessage } from "../../../utils/generic-validator";
import { Product, Supplier } from "../models/product";
import { ElementRef } from "@angular/core";
import { fromEvent, merge, Observable } from "rxjs";
import { FormBaseComponent } from "../../base-components/form-base.component";

export abstract class ProductFormBaseComponent extends FormBaseComponent{
  public MASKS = MASKS
  errors: any[] = [];
  productForm !: FormGroup;
   product!: Product;
  suppliers!: Supplier[];

  errorMessage!: string;

  constructor(){
    super();
    this.validationMessages = {
      supplierId: {
        required: 'Choose a supplier.',
      },
      name: {
        required: 'Enter the product name.',
        minlength: 'Minimum 2 characters.',
        maxlength: 'Maximum 200 characters.'
      },
      description: {
        required: 'Description must be filled',
        minlength: 'Minimum 2 characters',
        maxlength: 'Maximum 1000 characters.'
      },
      image: {
        required: 'Insert an Image.',
      },
      value: {
        required: 'Insert an amount',
      }

    };

    super.settingUpMessagesValidation(this.validationMessages);

  }

  protected configurateValidationForm(formInputElements:ElementRef[]){
    super.settingUpFormValidation(formInputElements, [this.productForm])
  }



}