import { ElementRef } from "@angular/core";
import { DisplayMessage, GenericValidator, ValidationMessages } from "../../utils/generic-validator";
import { FormGroup } from "@angular/forms";
import { fromEvent, merge, Observable } from "rxjs";

export abstract class FormBaseComponent {
  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};
  changesNotSaved!: boolean;


  protected settingUpMessagesValidation(validationMessages: ValidationMessages) {
    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected settingUpFormValidation(formInputElements: ElementRef[], formGroup: FormGroup[]) {
    let controlBlurs: Observable<any>[] = formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    let controlDigits: Observable<any>[] = formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'keyup'));

    merge(...controlDigits).subscribe(() => {
      this.formValidate(formGroup)
    })

    merge(...controlBlurs).subscribe(() => {

      this.formValidate(formGroup)

    })
  }
  protected formValidate(formGroups: FormGroup[]) {
    formGroups.forEach((formGroup) => {
      const result = this.genericValidator.messageProcessing(formGroup);
      this.displayMessage = { ...this.displayMessage, ...result };
    });
    this.changesNotSaved = true;
  }
}