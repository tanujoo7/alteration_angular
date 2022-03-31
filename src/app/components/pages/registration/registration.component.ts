import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  loginForm: FormGroup;
  submitteded = false;
  selectedState: any;
  selectedcountry: any;
  roleList: any = [
    { id: 2, name: "Manager" },
    { id: 3, name: "Staff" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      fullname: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      companyname: ["", Validators.required],
      country: ["India", Validators.required],
      state: ["Madhya Pradesh", Validators.required],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    } else {
      this.spinner.show();
      let data = {
        fullname: this.userForm.value.fullname,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        companyname: this.userForm.value.companyname,
        country: this.userForm.value.country,
        state: this.userForm.value.state,
      };
      this.authService.registrations(data).subscribe((result) => {
        if (result["success"]) {
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
            title: result.message,
          });
          var data = result["data"];
          console.log(result["data"]);
          this.router.navigateByUrl("/login");
          // this.toastr.success(result['message']);
        } else {
          // this.toastr.error(result["message"]);
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
            title: result.message,
          });
        }
      });
    }
  }
  dropdownCity: any = [];
  populatecountry(e: any) {
    console.log(e.target.value);
    this.dropdownCity = this.state.filter((i) => i.state == e.target.value);
  }
  country: any = [
    { id: 1, name: "New Zealand" },
    { id: 2, name: "India" },
  ];

  state: any = [
    { id: 1, name: "Auckland ", state: 1 },
    { id: 2, name: "Canterbury", state: 1 },
    { id: 3, name: "Wellington", state: 1 },
    { id: 4, name: "Waikato", state: 1 },
    { id: 5, name: "Bay of Plenty", state: 1 },
    { id: 6, name: "Manawatu-Wanganui", state: 1 },
    { id: 7, name: "Otago", state: 1 },
    { id: 8, name: "Hawke's Bay", state: 1 },
    { id: 9, name: "Northland", state: 1 },
    { id: 10, name: "Taranaki", state: 1 },
    { id: 11, name: "Southland", state: 1 },
    { id: 12, name: "Nelson", state: 1 },
    { id: 13, name: "Gisborne", state: 1 },
    { id: 14, name: "Marlborough", state: 1 },
    { id: 15, name: "Tasman", state: 1 },
    { id: 16, name: "West Coast", state: 1 },

    { id: 17, name: "Andhra Pradesh", state: 2 },
    { id: 18, name: "Arunachal Pradesh", state: 2 },
    { id: 19, name: "Assam", state: 2 },
    { id: 20, name: "Bihar", state: 2 },
    { id: 21, name: "Chandigarh", state: 2 },
    { id: 22, name: "Chhattisgarh", state: 2 },
    { id: 23, name: "Dadra and Nagar Haveli", state: 2 },
    { id: 24, name: "Daman and Diu", state: 2 },
    { id: 25, name: "Delhi", state: 2 },
    { id: 26, name: "Goa", state: 2 },
    { id: 27, name: "Gujarat", state: 2 },
    { id: 28, name: "Haryana", state: 2 },
    { id: 29, name: "Himachal Pradesh", state: 2 },
    { id: 30, name: "Jammu and Kashmir", state: 2 },
    { id: 31, name: "Jharkhand", state: 2 },
    { id: 32, name: "Karnataka", state: 2 },
    { id: 33, name: "Kerala", state: 2 },
    { id: 34, name: "Lakshadweep", state: 2 },
    { id: 35, name: "Madhya Pradesh", state: 2 },
    { id: 36, name: "Maharashtra", state: 2 },
    { id: 37, name: "Manipur", state: 2 },
    { id: 38, name: "Meghalaya", state: 2 },
    { id: 39, name: "Mizoram", state: 2 },
    { id: 40, name: "Nagaland", state: 2 },
    { id: 41, name: "Odisha", state: 2 },
    { id: 42, name: "Puducherry", state: 2 },
    { id: 43, name: "Punjab", state: 2 },
    { id: 44, name: "Rajasthan", state: 2 },
    { id: 45, name: "Sikkim", state: 2 },
    { id: 46, name: "Tamil Nadu", state: 2 },
    { id: 47, name: "Telangana", state: 2 },
    { id: 48, name: "Tripura", state: 2 },
    { id: 49, name: "Uttar Pradesh", state: 2 },
    { id: 50, name: "Uttarakhand", state: 2 },
    { id: 51, name: "West Bengal", state: 2 },
  ];
}
