import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../../utils/generic-validator';
import { CustomValidators } from 'ngx-custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, {read: ElementRef} ) formInputElements !: ElementRef[];

  errors: any[] = [];
  registerForm !: FormGroup;
  user!: User;
  changesNotSaved!: boolean;
  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator ;
  displayMessage: DisplayMessage = {};

  constructor (private formBuilder: FormBuilder, private accountService: AccountService,
    private router: Router, private toastr: ToastrService
  ){
    this.validationMessages = {
      email:{
        required: 'The field e-mail is required.',
        email: 'E-mail format is invalid.'
      },
      password:{
        required: 'The field password is required.',
        rangeLength: 'The field password needs to have a length between 6 to 15 chars'
      },
      confirmPassword: {
        equalTo: 'The passwords don\'t match'
      }
    }

    this.genericValidator = new GenericValidator(this.validationMessages)
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    let controlDigits: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'keyup'));

    merge(...controlDigits).subscribe(() => {
      this.displayMessage = this.genericValidator.messageProcessing(this.registerForm);
      this.changesNotSaved = true;
    })

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.messageProcessing(this.registerForm);
      this.changesNotSaved = true;
    })
  }

  ngOnInit(): void {
    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
    let confirmPassword = new FormControl('', [CustomValidators.equalTo(password)])
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  registerUser(){
    if(this.registerForm.dirty && this.registerForm.valid){
      this.user = Object.assign({}, this.user, this.registerForm.value);
        this.accountService.userRegister(this.user).subscribe({
          next: (success)=> this.successOnRegister(success) ,
          error: (except) => this.errorOnRegister(except)
      }  );
      this.changesNotSaved = false;
    }
  }

  successOnRegister(response: any){
    this.registerForm.reset();
    this.errors = [];

    this.accountService.localStorage.setLocalUserData(response);
    let toast = this.toastr.success('Your registration has been successful', 'Welcome!! :D')
    if(toast){
      toast.onHidden.subscribe(()=>this.router.navigate(['/home']))
    }

  }

  errorOnRegister(error: any){
    this.errors = error.error.errors
    this.toastr.error('An error occurred ', 'Oops :\'(')
  }

}
