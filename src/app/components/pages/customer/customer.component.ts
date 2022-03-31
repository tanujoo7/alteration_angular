import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  addressForm: FormGroup;
  submitted = false;
  AddressInfo: any;
  settingspage = false;
  selectedUser: any = {};
  selectedBillingAddress: string;
  selectedShippingAddress: string;
  selectedUseredit: any = {};
  loader: boolean = false;
  showError: any;
  customerList: any;

  BusinessList = [{ name: "Staff", id: "2" }];
  stateList = [
    { name: "Maharashtra", id: "1" },
    { name: "Madhya Pradesh", id: "2" },
    { name: "Rajasthan", id: "3" },
    { name: "Delhi", id: "4" },
  ];
  loginUser: any;
  inviteuserModel: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.loader = true;
    this.spinner.show();
    this.authService.customerList().subscribe((result) => {
      if (result["success"]) {
        if (result["data"].length <= 0) {
          this.showError = "No data found!";
        }
        console.log(result);
        this.customerList = result.data;
        this.spinner.hide();
        result.data.map((ele, i, arr) => {
          // console.log("61 selectedBillingAddressselectedBillingAddress");
          ele.addresses.map((ele, i) => {
            console.log("actuallllll addressss", ele);
          });
        });
      } else {
        this.spinner.hide();
      }
    });
  }
  deleteCutomer(data: any) {
    this.spinner.show();
    this.authService.deletecustomer({ id: data.id }).subscribe((result) => {
      if (result["success"]) {
        this.getCustomer();
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
        this.settingspage = false;
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
          icon: "success",
          title: result["message"],
        });
      }
    });
    // this.spinner.hide();
  }

  mySettingsOpen = (customerInfo) => {
    this.selectedBillingAddress = "";
    this.selectedShippingAddress = "";
    customerInfo.addresses.map((ele, i) => {
      if (ele.type == "billingAddress") {
        this.selectedBillingAddress = ele.address_line_1;
        console.log("ele.address_line_1;", ele.address_line_1);
      }
      if (ele.type == "shippingAddress") {
        this.selectedShippingAddress = ele.address_line_1;
      }
    });
    this.settingspage = true;
  };

  mySettingsClose = () => {
    this.settingspage = false;
  };

  deleteUser() {
    /*  this.authService.deleteUserAPI({ email: this.selectedUser.u_email }).subscribe(result => {
       if (result['success']) {
         this.getUser();
       }
     }) */
  }
  gotoAddCutomer(data: any) {
    this.router.navigate([`/addCutomer/${data?.id}`], {
      state: { data: data },
    });
    // this.router.navigate(['/customer'],[data:data]);
  }

  openinviteUser() {
    this.inviteuserModel = true;
  }
  toggleUser() {
    /* this.authService.toggleUserAPI({ email: this.selectedUser.u_email, u_is_active: this.selectedUser.u_is_active ? 0 : 1 }).subscribe(result => {
      if (result['success']) {
        this.getUser();
      }
    }) */
  }
}
