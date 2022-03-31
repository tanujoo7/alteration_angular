import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-addcustomer",
  templateUrl: "./addcustomer.component.html",
  styleUrls: ["./addcustomer.component.css"],
})
export class AddcustomerComponent implements OnInit {
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
  countryList = [{ name: "india", id: "1" }];
  loginUser: any;
  allData: any = history.state.data;
  user: any;
  loader: boolean = false;
  showError: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    /* this.authService.getUserDetail({ id: this.user }).subscribe(result => {
      if (result['success']) {
        this.loginUser = result['data'].user[0];
      } else {
        this.toastr.error(result['message']);
      }
    }) */
  }

  getCustomer() {
    this.spinner.show();
    this.authService.customerList().subscribe((result) => {
      if (result["success"]) {
        this.spinner.hide();
        if (result["data"].length <= 0) {
          this.showError = "No Customer found!";
        }
        console.log(result);
        this.allData = result.data;
      }
    });
  }

  ngOnInit(): void {
    let editedCustomerId = this.route.snapshot.paramMap.get("id");
    console.log("45 editedCustomerId", editedCustomerId);
    if (editedCustomerId) {
      this.getCustomerById();
    }
    this.spinner.show();
    this.user = localStorage.getItem("userId");
    var data = {
      userId: this.user,
    };
    this.authService.getUserDetail(data).subscribe((result) => {
      if (result["success"]) {
        this.loginUser = result["data"].user[0];
        console.log(this.loginUser);
        this.spinner.hide();
      } else {
        this.toastr.error(result["message"]);
        this.spinner.hide();
      }
      // this.spinner.hide();
    });
    this.addressForm = this.formBuilder.group({
      type: ["business"],
      company: [""],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      nickname: ["", Validators.required],
      email: ["", Validators.required],
      phonenumber: [""],
      website: [""],
      attention: [""],
      country: [""],
      street1: [""],
      street2: [""],
      city: [""],
      state: [""],
      postalCode: [""],
      addressPhone: [""],
      fax: [""],
      Sattention: [""],
      Scountry: [""],
      Sstreet1: [""],
      Sstreet2: [""],
      Scity: [""],
      Sstate: [""],
      SpostalCode: [""],
      SaddressPhone: [""],
      Sfax: [""],
    });

    if (this.allData) {
      let billingAddress = this.allData?.addresses.find(
        (ele: any) => ele?.type == "billingAddress"
      );
      let shippingAddress = this.allData?.addresses.find(
        (ele: any) => ele?.type == "shippingAddress"
      );

      this.addressForm.patchValue({
        type: this.allData.type,
        firstname: this.allData?.firstname,
        lastname: this.allData?.lastname,
        nickname: this.allData?.nickname,
        email: this.allData?.email,
        phonenumber: this.allData?.phonenumber,
        website: this.allData?.website,
        attention: billingAddress?.attention,
        country: billingAddress?.country,
        street1: billingAddress?.address_line_1,
        street2: billingAddress?.address_line_2,
        city: billingAddress?.city,
        state: billingAddress?.state,
        postalCode: billingAddress?.zipcode,
        addressPhone: billingAddress?.phone,
        fax: billingAddress?.fax,
        Sattention: shippingAddress?.attention,
        Scountry: shippingAddress?.country,
        Sstreet2: shippingAddress?.address_line_1,
        Sstreet1: shippingAddress?.address_line_2,
        Scity: shippingAddress?.city,
        Sstate: shippingAddress?.state,
        SpostalCode: shippingAddress?.zipcode,
        SaddressPhone: shippingAddress?.phone,
        Sfax: shippingAddress?.fax,
      });
    }
  }

  getCustomerById() {
    this.loader = true;
    this.spinner.show();
    let editedCustomerId = this.route.snapshot.paramMap.get("id");
    this.authService.customerById(editedCustomerId).subscribe((result) => {
      console.log("resultttt 157customerById", result);
      if (result["success"]) {
        if (result["data"].length <= 0) {
          this.showError = "No Customer found!";
        }
        console.log(result);
        this.allData = result.data;
        this.letPatchFields();
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  letPatchFields() {
    let billingAddress = this.allData?.addresses.find(
      (ele: any) => ele?.type == "billingAddress"
    );
    let shippingAddress = this.allData?.addresses.find(
      (ele: any) => ele?.type == "shippingAddress"
    );

    this.addressForm.patchValue({
      type: this.allData.type,
      firstname: this.allData?.firstname,
      lastname: this.allData?.lastname,
      nickname: this.allData?.nickname,
      email: this.allData?.email,
      phonenumber: this.allData?.phonenumber,
      website: this.allData?.website,
      attention: billingAddress?.attention,
      country: billingAddress?.country,
      street1: billingAddress?.address_line_1,
      street2: billingAddress?.address_line_2,
      city: billingAddress?.city,
      state: billingAddress?.state,
      postalCode: billingAddress?.zipcode,
      addressPhone: billingAddress?.phone,
      fax: billingAddress?.fax,
      Sattention: shippingAddress?.attention,
      Scountry: shippingAddress?.country,
      Sstreet1: shippingAddress?.address_line_1,
      Sstreet2: shippingAddress?.address_line_2,
      Scity: shippingAddress?.city,
      Sstate: shippingAddress?.state,
      SpostalCode: shippingAddress?.zipcode,
      SaddressPhone: shippingAddress?.phone,
      Sfax: shippingAddress?.fax,
    });
  }

  /*  getUser() {
     this.authService.getUserDetail({ userId: localStorage.getItem('userId') }).subscribe(result => {
       if (result['success']) {
         this.loginUser = result['data'].user[0];
         this.AddressInfo = JSON.parse(this.loginUser.companyAddress)
         console.log("data", this.loginUser.companyAddress)
         this.addressForm.patchValue({
           company: this.loginUser?.company,
           street1: this.AddressInfo?.street1,
           street: this.AddressInfo?.street,
           country: this.AddressInfo?.country,
           state: this.AddressInfo?.state,
           city: this.AddressInfo?.city,
           postalCode: this.AddressInfo?.postalCode,
           phonenumber: this.AddressInfo?.phonenumber,
           website: this.AddressInfo?.website,
         })
       }
     })
   } */

  get f() {
    return this.addressForm.controls;
  }

  addCustomer() {
    this.submitted = true;
    if (this.addressForm.invalid) {
      return;
    } else {
      this.spinner.show();
      let cAddress = {
        attention: this.addressForm.value?.attention,
        country: this.addressForm.value?.country,
        address_line_1: this.addressForm.value?.street1,
        address_line_2: this.addressForm.value?.street2,
        city: this.addressForm.value?.city,
        state: this.addressForm.value?.state,
        zipcode: this.addressForm.value?.postalCode,
        phone: this.addressForm.value?.addressPhone,
        fax: this.addressForm.value?.fax,
      };
      let shippingAddress = {
        attention: this.addressForm.value?.Sattention,
        country: this.addressForm.value?.Scountry,
        address_line_1: this.addressForm.value?.Sstreet1,
        address_line_2: this.addressForm.value?.Sstreet2,
        city: this.addressForm.value?.Scity,
        state: this.addressForm.value?.Sstate,
        zipcode: this.addressForm.value?.SpostalCode,
        phone: this.addressForm.value?.SaddressPhone,
        fax: this.addressForm.value?.Sfax,
      };

      if (this.allData?.id) {
       
        let data = {
          id: this.allData.id,
          user_id: localStorage.getItem("userId"),
          type: this.addressForm.value?.type,
          firstname: this.addressForm.value?.firstname,
          lastname: this.addressForm.value?.lastname,
          nickname: this.addressForm.value?.nickname,
          email: this.addressForm.value?.email,
          phonenumber: this.addressForm.value?.phonenumber,
          website: this.addressForm.value?.website,
          companyname: this.addressForm.value.company,
          companyAddress: cAddress,
          shippingAddress: shippingAddress,
        };
        
        this.authService.updateCustomer(data).subscribe((result) => {
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
              title: result["message"],
            });
            // this.submitEmailAddressForm.reset();
            this.router.navigate(["/customer"]);
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
            // this.toastr.error(result["message"]);
          }
        });
      } else {
        let data = {
          user_id: localStorage.getItem("userId"),
          type: this.addressForm.value?.type,
          firstname: this.addressForm.value?.firstname,
          lastname: this.addressForm.value?.lastname,
          nickname: this.addressForm.value?.nickname,
          email: this.addressForm.value?.email,
          phonenumber: this.addressForm.value?.phonenumber,
          website: this.addressForm.value?.website,
          companyname: this.addressForm.value.company,
          companyAddress: cAddress,
          shippingAddress: shippingAddress,
        };
        
        this.authService.addCustomer(data).subscribe((result) => {
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
              title: result["message"],
            });
            // this.toastr.success(result["message"]);
            this.router.navigate(["/customer"]);
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
            // this.toastr.error(result["message"]);
          }
        });
      }
      this.spinner.hide();
    }
  }
  copyBillingAddress() {
    this.addressForm.patchValue({
      Sattention: this.addressForm.value.attention,
      Scountry: this.addressForm.value.country,
      Sstreet1: this.addressForm.value.street1,
      Sstreet2: this.addressForm.value.street2,
      Scity: this.addressForm.value.city,
      Sstate: this.addressForm.value.state,
      SpostalCode: this.addressForm.value.postalCode,
      SaddressPhone: this.addressForm.value.addressPhone,
      Sfax: this.addressForm.value.fax,
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
