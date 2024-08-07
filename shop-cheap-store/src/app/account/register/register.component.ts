import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../../utils/generic-validator';
import { CustomValidators } from 'ngx-custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from '../../base-components/form-base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, {read: ElementRef} ) formInputElements !: ElementRef[];

  errors: any[] = [];
  registerForm !: FormGroup;
  user!: User;

  constructor (private formBuilder: FormBuilder, private accountService: AccountService,
    private router: Router, private toastr: ToastrService
  ){
    super();
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

    super.settingUpMessagesValidation(this.validationMessages)
  }

  ngAfterViewInit(): void {
    super.settingUpFormValidation(this.formInputElements, [this.registerForm])
  }

  ngOnInit(): void {
    let password = new FormControl<string>( {value: '', disabled: false}, [Validators.required, CustomValidators.rangeLength([6,15])]);
    let confirmPassword = new FormControl('')
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
