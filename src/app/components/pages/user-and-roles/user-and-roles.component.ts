import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-user-and-roles",
  templateUrl: "./user-and-roles.component.html",
  styleUrls: ["./user-and-roles.component.css"],
})
export class UserAndRolesComponent implements OnInit {
  settingspage = false;
  inviteuserForm: FormGroup;
  submitted = false;
  inviteuserModel: boolean = false;
  showRoles: boolean = false;
  userList: any;
  roleList = ["Manager", "Staff"];
  selectedRole: string;
  selectedUser: any = {};
  selectedUseredit: any = {};
  editUserDetails: boolean = false;
  activeRoles : boolean = false;
  activeUsers : boolean = true;
  @ViewChild("inviteModal") inviteModal!: ElementRef;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    console.log(localStorage.getItem("userId"));
  }

  ngOnInit(): void {
    this.inviteuserForm = this.formBuilder.group({
      fullname: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      role: ["", Validators.required],
    });
    this.getUser();
  }

  selected() {
    this.selectedRole = this.inviteuserForm.value.role;
    console.log("seleted role", this.inviteuserForm.value.role);
  }

  getUser() {
    this.spinner.show();
    this.authService.userList().subscribe((result) => {
      if (result["success"]) {
        this.spinner.hide();
        console.log(result);
        this.userList = result.data.userList;
      }
      this.spinner.hide();
    });
  }

  get f() {
    return this.inviteuserForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.inviteuserForm.invalid) {
      return;
    } else {
      this.spinner.show();
      let data = {
        managerid: localStorage.getItem("userId"),
        fullname: this.inviteuserForm.value.fullname,
        email: this.inviteuserForm.value.email,
        password: this.inviteuserForm.value.password,
        role: this.inviteuserForm.value.role,
      };
      if (this.editUserDetails == true) {
        delete data.password;
        this.authService.updateuser(data).subscribe((result) => {
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
            this.inviteuserForm.reset();
            this.inviteModal.nativeElement.click();
            this.inviteuserModel = false;
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
          this.spinner.hide();
        });
      } else {
        // this.spinner.show();
        this.authService.inviteUser(data).subscribe((result) => {
          if (result["success"]) {
            // this.toastr.success(result["message"]);
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
            this.inviteuserForm.reset();
            this.inviteModal.nativeElement.click();
            this.inviteuserModel = false;
          } else {
            // this.toastr.error(result["message"]);
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
            this.spinner.hide();
          }
        });
      }
    }
  }

  toggleUser() {
    this.spinner.show();
    this.authService
      .toggleUserAPI({
        email: this.selectedUser.email,
        is_active: this.selectedUser.is_active ? 0 : 1,
      })
      .subscribe((result) => {
        if (result["success"]) {
          this.getUser();
          this.spinner.hide();
        }
      });
  }

  deleteUser() {
    this.spinner.show();
    this.authService
      .deleteUserAPI({ email: this.selectedUser.email })
      .subscribe((result) => {
        if (result["success"]) {
          this.spinner.hide();
          this.getUser();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
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
            position: "top-end",
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
        this.spinner.hide();
      });
  }

  openinviteUser(value: string) {
    this.inviteuserModel = true;
    console.log("valuvaluevlauevlaue", value);
    console.log("selected", this.selectedUseredit);
    if (value == "editUser") {
      this.editUserDetails = true;
      this.inviteuserForm.controls.password.setValue("");
      // this.inviteuserForm.controls.email.disable();
      this.inviteuserForm.controls.password.setValidators([]);
    }
    if (value == "inviteUser") {
      this.inviteuserForm.reset();
    }
  }

  mySettingsOpen = () => {
    this.settingspage = true;

    this.inviteuserForm.patchValue({
      fullname: this.selectedUser.fullname,
      email: this.selectedUser.email,
      password: this.selectedUser.password,
      role: this.selectedUser.role,
    });

    console.log(
      "selectedUserselectedUserselectedUserselectedUserselectedUser",
      this.selectedUser
    );
  };

  mySettingsClose = () => {
    this.settingspage = false;
    this.inviteuserForm.patchValue({
      fullname: "",
      email: "",
      password: "",
      CompanyName: "",
    });
  };

  showRolesTab() {
    this.showRoles = !this.showRoles;
  }
}
