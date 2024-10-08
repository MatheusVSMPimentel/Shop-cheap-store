import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../../utils/generic-validator';
import { CustomValidators } from 'ngx-custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from '../../base-components/form-base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, {read: ElementRef} ) formInputElements !: ElementRef[];

  errors: any[] = [];
  loginForm !: FormGroup;
  user!: User;
  returnUrl!: string;

  constructor (private formBuilder: FormBuilder, private accountService: AccountService,
    private router: Router, private acRoute: ActivatedRoute, private toastr: ToastrService
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
      }
    }
    this.returnUrl= this.acRoute.snapshot.queryParams['returnUrl'];
    super.settingUpMessagesValidation(this.validationMessages)
  }

  ngAfterViewInit(): void {
    super.settingUpFormValidation(this.formInputElements,[this.loginForm]);
  }

  ngOnInit(): void {
    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: password,
    });
  }

  login(){
    if(this.loginForm.dirty && this.loginForm.valid){
      this.user = Object.assign({}, this.user, this.loginForm.value);
        this.accountService.login(this.user).subscribe({
          next: (success)=> this.successOnRegister(success) ,
          error: (except) => this.errorOnRegister(except)
      }  );

    }
  }

  successOnRegister(response: any){
    this.loginForm.reset();
    this.errors = [];
    let routeNavigate = this.returnUrl ?? '/home';
    this.accountService.localStorage.setLocalUserData(response);
    let toast = this.toastr.success('Your registration has been successful', 'Welcome!! :D')
    if(toast){
      toast.onHidden.subscribe(()=>this.router.navigate([routeNavigate]))
    }

  }

  errorOnRegister(error: any){
    this.errors = error.error.errors
    this.toastr.error('An error occurred ', 'Oops :\'(')
  }



}
