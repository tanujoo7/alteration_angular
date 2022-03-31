import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.component.html',
  styleUrls: ['./forgetPassword.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  otpTab = false;
  loginForm: FormGroup;
  submitteded = false;
  errorMessage: any;
  errorMessage1: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
    //   this.loginForm = this.formBuilder.group({
    //     email: ['', Validators.required],
    //     password: ['', Validators.required],
    // });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }
  get f2() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {

      return;
    } else {
      let data = {
        email: this.userForm.value.email
      }
      this.loginForm = this.formBuilder.group({
        email: this.userForm.value.email,
        otp: ['', Validators.required],
      });
      this.authService.forgotpasswords(data).subscribe(result => {
        if (result['success']) {
          var data = result['data'];
          this.otpTab = true;
        } else {
          this.toastr.error(result['message']);
          console.log(result['message']);
          this.errorMessage = result['message'];

        }
      })
    }
  }

  submitotp() {
    this.submitteded = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      let data = {
        email: this.loginForm.value.email,
        otp: this.loginForm.value.otp
      }
      this.authService.submitOtp(data).subscribe(result => {
        if (result['success']) {
          var data = result['data'];
          console.log("data", data.url);
          this.router.navigate([`/${data.url}`]);
        } else {
          this.toastr.error(result['message']);
          this.errorMessage1 = result['data'];
        }
      })
    }
  }




}
