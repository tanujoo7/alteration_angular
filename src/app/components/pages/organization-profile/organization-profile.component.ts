import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-organization-profile",
  templateUrl: "./organization-profile.component.html",
  styleUrls: ["./organization-profile.component.css"],
})
export class OrganizationProfileComponent implements OnInit {
  addressForm: FormGroup;
  submitted = false;
  AddressInfo: any;
  BusinessList = [{ name: "Staff", id: "2" }];
  stateList = [
    { name: "Maharashtra", id: "1" },
    { name: "Madhya Pradesh", id: "2" },
    { name: "Rajasthan", id: "3" },
    { name: "Delhi", id: "4" },
  ];
  loginUser: any;
  file: any;
  imageSrc: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      companyname: ["", Validators.required],
      street1: ["", Validators.required],
      street2: ["", Validators.required],
      country: ["india", Validators.required],
      state: ["select", Validators.required],
      city: ["", Validators.required],
      postalCode: ["", Validators.required],
      phone: ["", Validators.required],
      website: ["", Validators.required],
    });
    this.getUser();
  }
  getUser() {
    this.spinner.show();
    this.authService
      .getUserDetail({ userId: localStorage.getItem("userId") })
      .subscribe((result) => {
        if (result["success"]) {
          this.loginUser = result["data"].user[0];
          if (this.loginUser.addresses.length > 0) {
            this.loginUser.addresses.map((ele, i) => {
              this.AddressInfo = ele;
            });
          }
          console.log("data in Organization Profileeeeeeeee56", this.loginUser);
          this.addressForm.patchValue({
            companyname: this.loginUser?.companyname,
            street1: this.AddressInfo?.address_line_1,
            street2: this.AddressInfo?.address_line_2,
            country: this.AddressInfo?.country,
            state: this.AddressInfo?.state,
            city: this.AddressInfo?.city,
            postalCode: this.AddressInfo?.zipcode,
            phone: this.AddressInfo?.phone,
            website: this.loginUser?.website,
          });
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
    this.spinner.hide();
  }
  get f() {
    return this.addressForm.controls;
  }
  updateAddress() {
    this.submitted = true;
    if (this.addressForm.invalid) {
      return;
    } else {
      this.spinner.show();
      let cAddress = {
        attention: this.addressForm.value?.attention,
        address_line_1: this.addressForm.value?.street1,
        address_line_2: this.addressForm.value?.street2,
        city: this.addressForm.value?.city,
        state: this.addressForm.value?.state,
        country: this.addressForm.value?.country,
        zipcode: this.addressForm.value?.postalCode,
        phone: this.addressForm.value?.phone,
      };

      let data = {
        id: this.loginUser?.id,
        nickname: this.loginUser?.nickname,
        email: this.loginUser?.email,
        gender: this.loginUser?.gender,
        fullname: this.loginUser?.name,
        country: "India",
        state: this.loginUser?.state,
        companyname: this.addressForm.value?.companyname,
        website: this.addressForm.value?.website,
        companyAddress: JSON.stringify(cAddress),
      };
      console.log(data);
      this.authService.editAddress(data).subscribe((result) => {
        if (result["success"]) {
          this.getUser();
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
            title: result["message"],
          });
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
        }
      });
    }
  }

  removeimage() {
    this.imageSrc = null;
  }

  uploadFile = (event: any) => {
    this.file = event.target.files[0];
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  };
}
