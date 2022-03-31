import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Inject,
  EventEmitter,
  Injectable,
  ChangeDetectorRef,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";

import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { CompanyComponent } from "../company/company.component";
import { ProductsComponent } from "../products/products.component";
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-middleware",
  templateUrl: "./middleware.component.html",
})
export class MiddlewareComponent implements OnInit {
  @ViewChild("toggle") toggle: ElementRef;
  @ViewChild("sidebar") sidebar: ElementRef;
  @ViewChild("container") container: ElementRef;
  @ViewChild("cdropdown1") cdropdown1: ElementRef;
  profilepage = false;
  settingspage = false;
  dropdown = false;
  selectedSearchFor: any;
  loginUser: any;
  user: any;
  isreverse: any = false;
  imageSrc: any = "/assets/images/pic.gif";
  uploadForm: FormGroup;
  editFile: boolean = true;
  removeUpload: boolean = false;
  private cd: ChangeDetectorRef;
  submitted = false;
  isOrganization = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    public router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private CompanyComponent: CompanyComponent,
    private ProductsComponent: ProductsComponent,
    private formBuilder: FormBuilder
  ) {
    if (this.router.url === "/company") {
      this.selectedSearchFor = "Company";
    } else if (this.router.url === "/products") {
      this.selectedSearchFor = "Products";
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === "/organizations") this.isOrganization = true;
        else this.isOrganization = false;
      }
    });

    this.authService
      .getUserDetail({ userId: this.user })
      .subscribe((result) => {
        if (result["success"]) {
          this.loginUser = result["data"].user[0];
        } else {
          // this.toastr.error(result["message"]);
        }
      });
  }

  ngOnChanges() {
    var data = {
      userId: localStorage.getItem("userId"),
    };

    this.authService.getUserDetail(data).subscribe((result) => {
      if (result["success"]) {
        this.loginUser = result["data"].user[0];
        console.log("middleware user ngOnChanges 85", result["data"].user[0]);
      } else {
        // this.toastr.error(result["message"]);
      }
    });
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      userId: ["", Validators.required],
      photos: [""],
    });
    this.user = localStorage.getItem("userId");
    var data = {
      userId: this.user,
    };
    this.authService.getUserDetail(data).subscribe((result) => {
      if (result["success"]) {
        this.loginUser = result["data"].user[0];
        console.log("middleware user dataaaaaa 71", result["data"].user[0]);
      } else {
        // this.toastr.error(result["message"]);
      }
    });
  }

  openMyProfile = () => {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`profile`])
    );
    this.profilepage = false;
    window.open("#/profile", "_blank");
  };

  modelChanged(newObj) {
    newObj.target.value = "";
    if (this.selectedSearchFor === "Company") {
      newObj.target.value = "";
    } else if (this.selectedSearchFor === "Products") {
      newObj.target.value = "";
    } else {
      if (this.router.url === "/company")
        this.CompanyComponent.onSearch(newObj.target.value);
      if (this.router.url === "/products")
        this.ProductsComponent.onSearch(newObj.target.value);
      console.log(newObj.target.value);
      this.isreverse = true;
    }
  }

  myProfile1 = () => {
    this.profilepage = true;
    var data = {
      userId: this.user,
    };
    this.authService.getUserDetail(data).subscribe((result) => {
      if (result["success"]) {
        this.loginUser = result["data"].user[0];
        console.log(this.loginUser);
      } else {
        // this.toastr.error(result["message"]);
      }
    });
  };

  mySettingsOpen = () => {
    this.settingspage = true;
  };

  mySettingsClose = () => {
    this.settingspage = false;
  };

  Menu = () => {
    this.toggle.nativeElement.classList.toggle("show");
    this.sidebar.nativeElement.classList.toggle("show");
    this.container.nativeElement.classList.toggle("show");
  };

  dropdownBox = () => {
    //  this.dropdown =true;
    this.dropdown = !this.dropdown;
  };

  menuClose(value) {
    this.selectedSearchFor = value;
    this.dropdown = false;
  }

  myProfileClose = () => {
    this.profilepage = false;
  };

  onchangeselect(e) {
    if (e.target.value === "Company" && this.selectedSearchFor === "Company") {
      e.target.value = "";
    } else if (
      e.target.value === "Products" &&
      this.selectedSearchFor === "Products"
    ) {
      e.target.value = "";
    } else {
      if (e.target.value === "Company") {
        this.selectedSearchFor = "Company";
        this.router.navigate(["/company"]);
      } else if (e.target.value === "Products") {
        this.selectedSearchFor = "Products";
        this.router.navigate(["/products"]);
      }
      e.target.value = "";
    }
  }

  Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    this.router.navigate(["/home"], { state: { isLogout: true } });
    // history.state.isLogout
  }

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.uploadForm.patchValue({
          photos: reader.result,
        });
        this.editFile = false;
        this.removeUpload = true;
        this.submitted = true;
        // if (this.uploadForm.invalid) {
        //     return;
        // }else{
        console.log(this.uploadForm.value);
        let formData: any = new FormData();
        formData.append("image", this.uploadForm.value.photos);
        formData.append("userId", this.user);
        console.log(formData);
        this.authService.updateImages(formData).subscribe((result) => {
          if (result["success"]) {
            // this.toastr.success(result["message"]);
          } else {
            // this.toastr.error(result["message"]);
          }
        });

        // }
      };
    }
  }
}
