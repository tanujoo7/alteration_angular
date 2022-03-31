import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
// import imageWarning from "../../../../assets/images/warningImage.png";
// import Swal from "sweetalert2";
import Swal from "sweetalert2/dist/sweetalert2.js";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  registerForm: FormGroup;
  onlyMobileNumberForm: FormGroup;
  submitEmailAddressForm: FormGroup;
  submitted = false;
  isShown: boolean = false;
  loginUser: any;
  name: any;
  GenderName: any;
  associatedEmailAddress: any;
  associatedMobileNumbers: any;
  state: any;
  isModal: boolean = false;
  isModalEmailAddress: boolean = false;
  gender = [
    { name: "Male", id: "1" },
    { name: "Female", id: "2" },
    { name: "I d prefer not to say", id: "3" },
  ];
  stateList = [
    { name: "Maharashtra", id: "1" },
    { name: "Madhya Pradesh", id: "2" },
    { name: "Rajasthan", id: "3" },
    { name: "Delhi", id: "4" },
  ];
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      fullname: ["", Validators.required],
      lastname: ["", Validators.required],
      nickname: ["", Validators.required],
      gender: ["", Validators.required],
      country: ["india", Validators.required],
      state: ["", Validators.required],
      language: ["English"],
      time: ["(+5:30) India Standard Time ( Asia/Kolkata )"],
    });

    this.onlyMobileNumberForm = this.formBuilder.group({
      mobile_number: ["", Validators.required],
    });
    this.submitEmailAddressForm = this.formBuilder.group({
      email_address: ["", Validators.required],
    });
    this.getUser();
  }

  catchDate(date) {
    const d = new Date(date);
    console.log("getDayyyyyyyyyyy", d.getTime(), "day", d.getDay());
    return d.getDay();
  }

  onSubmitAddMobileNumber() {
    if (this.onlyMobileNumberForm.invalid) {
      return;
    } else {
      this.spinner.show();
      let data = {
        mobile_number: this.onlyMobileNumberForm.value.mobile_number,
        user_id: this.loginUser.id,
      };
      this.authService.addUsersMobileNumber(data).subscribe((result) => {
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
            title: `${result.data.mobile_number} Number added!`,
          });
          this.onlyMobileNumberForm.reset();
          this.toggleModal();
          // this.isShown = !this.isShown;
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
          this.onlyMobileNumberForm.reset();
          this.toggleModal();
        }
      });
      this.spinner.hide();
    }
  }

  deleteNumber(numberdetail) {
    if (Object.keys(numberdetail).length <= 0) {
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
        title: "Number not found!",
      });
      return;
    } else {
      this.spinner.show();

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "confirmButtonCss",
          cancelButton: "cancelButtonCss",
          title: "swal2-title-delete",
          htmlContainer: "swal2-html-container-delete",
          popup: "swal2-popup-delete",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: `Delete your mobile number ${numberdetail.mobile_number}?`,
          showCancelButton: true,
          padding: "15px",
          position: "top",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          focusConfirm: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.authService
              .DeleteUsersMobileNumber(numberdetail)
              .subscribe((result) => {
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
          } else if (result.dismiss === Swal.DismissReason.cancel) {
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
              title: "Number not deleted!",
            });
          }
        });
      this.spinner.hide();
    }
  }

  onSubmitEmailAddress() {
    if (this.submitEmailAddressForm.invalid) {
      return;
    } else {
      this.spinner.show();
      let data = {
        email_address: this.submitEmailAddressForm.value.email_address,
        user_id: this.loginUser.id,
      };
      this.authService.addUsersEmailAddress(data).subscribe((result) => {
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
            title: `${result.data.email}  Added!`,
          });
          this.submitEmailAddressForm.reset();
          this.isModalEmailAddress = !this.isModalEmailAddress;
          // this.isShown = !this.isShown;
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
          this.submitEmailAddressForm.reset();
          this.isModalEmailAddress = !this.isModalEmailAddress;
        }
      });
      // this.toggleModal();
      this.spinner.hide();
    }
  }

  deleteEmailAddress(emailDetail) {
    if (Object.keys(emailDetail).length <= 0) {
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
        title: "Number not found!",
      });
      return;
    } else {
      this.spinner.show();
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "confirmButtonCss",
          cancelButton: "cancelButtonCss",
          title: "swal2-title-delete",
          htmlContainer: "swal2-html-container-delete",
          popup: "swal2-popup-delete",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: `Delete the recovery email address ${emailDetail.email} permanently?`,
          showCancelButton: true,
          padding: "15px",
          position: "top",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          focusConfirm: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.authService
              .DeleteUsersEmailAddress(emailDetail)
              .subscribe((result) => {
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
          } else if (result.dismiss === Swal.DismissReason.cancel) {
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
              title: "Email not deleted!",
            });
          }
        });
      this.spinner.hide();
    }
  }

  getUser() {
    this.spinner.show();
    this.authService
      .getUserDetail({ userId: localStorage.getItem("userId") })
      .subscribe((result) => {
        if (result["success"]) {
          this.loginUser = result["data"].user[0];
          console.log(
            "searchAssociateEmailsearchAssociateEmailsearchAssociateEmail",
            this.loginUser
          );
          this.associatedEmailAddress = result.searchAssociateEmail;
          this.associatedMobileNumbers = result.searchAssociateMobileNumber;
          this.state = JSON.parse(this.loginUser.companyAddress);
          this.patchUserDetails();
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
    this.spinner.hide();
  }

  patchUserDetails() {
    this.registerForm.patchValue({
      email: this.loginUser?.email,
      fullname: this.loginUser?.fullname,
      lastname: this.loginUser?.lastname,
      nickname: this.loginUser?.nickname,
      gender: this.loginUser?.gender,
      country: this.loginUser?.country,
      state: this.loginUser?.state,
      language: "English",
      time: "(+5:30) India Standard Time ( Asia/Kolkata )",
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  updateProfile() {
    this.spinner.show();
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.authService
        .editUsers(this.registerForm.value)
        .subscribe((result) => {
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
              title: "User updated successfully!",
            });
            this.isShown = !this.isShown;
            this.getUser();
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
      this.spinner.hide();
    }
    this.spinner.hide();
  }

  toggleShow() {
    this.registerForm.patchValue({
      email: this.loginUser?.email,
      fullname: this.loginUser?.fullname,
      lastname: this.loginUser?.lastname,
      nickname: this.loginUser?.nickname,
      gender: this.loginUser?.gender,
      country: this.loginUser?.country,
      state: this.loginUser?.state,
      language: "English",
      time: "(+5:30) India Standard Time ( Asia/Kolkata )",
    });
    this.isShown = !this.isShown;
  }
  togglehide() {
    this.isShown = !this.isShown;
  }

  toggleModal() {
    this.isModal = !this.isModal;
  }

  toggleModalEmailAddress() {
    this.isModalEmailAddress = !this.isModalEmailAddress;
  }
}
