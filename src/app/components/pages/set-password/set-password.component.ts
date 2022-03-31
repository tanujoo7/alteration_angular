import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  otpTab = false;
  loginForm: FormGroup;
  submitteded = false;
  errorMessage: any;
  errorMessage1: any;
  email: any;
  otp: any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.otp = this.route.snapshot.paramMap.get('otp');
    this.userForm = this.formBuilder.group({
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });
  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    } else if (this.userForm.value.password !== this.userForm.value.cpassword) {
      this.toastr.error('Password and confirm password must be same.');
      return;
    } else {
      let data = {
        email: this.email,
        otp: this.otp,
        password: this.userForm.value.password,
      }
      this.authService.setpasswords(data).subscribe(result => {
        if (result['success']) {
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(result['message']);
          this.errorMessage = result['message'];
        }
      })
    }
  }
}
