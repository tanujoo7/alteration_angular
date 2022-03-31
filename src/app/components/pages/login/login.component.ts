import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  passwordTab = false;
  loginForm: FormGroup;
  submitteded = false;
  errorMessage: any;
  errorMessage1: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ["", Validators.required],
    });
    //   this.loginForm = this.formBuilder.group({
    //     email: ['', Validators.required],
    //     password: ['', Validators.required],
    // });
  }

  get f() {
    return this.userForm.controls;
  }
  get f2() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    } else {
      this.spinner.show();
      let data = {
        email: this.userForm.value.email,
      };
      this.loginForm = this.formBuilder.group({
        email: this.userForm.value.email,
        password: ["", Validators.required],
      });
      this.authService.userCheck(data).subscribe((result) => {
        console.log("checkUser name api hitted!!!!")
        if (result["success"]) {
          var data = result["data"];
          console.log(result["data"]);
          this.passwordTab = true;
          this.spinner.hide();
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "info",
            title: "Enter password!",
          });
        } else {
          // this.toastr.error(result["message"]);
          // console.log(result["message"]);
          // this.errorMessage = result["message"];
          this.spinner.hide();
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: result["message"],
          });
        }
      });
    }
  }

  login() {
    this.submitteded = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.spinner.show();
      let data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authService.login(data).subscribe((result) => {
        if (result["success"]) {
          console.log("85.....>", result);
          var data = result["data"];
          localStorage.setItem("userId", result.userId);
          localStorage.setItem("token", result.token);
          localStorage.setItem("role", result.role);
          this.spinner.hide();
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Welcome!",
          });

          this.router.navigate(["/dashboard"]);
        } else {
          this.spinner.hide();
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: result["message"],
          });
          // this.errorMessage1 = result["message"];
        }
      });
    }
  }
}
