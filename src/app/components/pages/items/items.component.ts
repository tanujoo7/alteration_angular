import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"],
})
export class ItemsComponent implements OnInit {
  settingspage = false;
  imageSrc: any;
  activetab = "Overview";
  tempFile: any;
  file: any;
  apiUrl = environment.apiUrl3;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  itemList: any;
  selectedItem: any;
  showmodal = false;
  ngOnInit(): void {
    this.getItem();
  }

  mySettingsOpen = (val) => {
    this.settingspage = true;
    this.imageSrc = this.apiUrl + "/" + val?.imgurl;
  };
  mySettingsClose = () => {
    this.settingspage = false;
  };

  gotoAdditem(data: any) {
    this.router.navigate(["/addItems"], {
      state: {
        data: data,
        uniqueunit: [
          ...new Set(
            this.itemList.map((j) => {
              return j.unit;
            })
          ),
        ],
      },
    });
  }

  gotoAddNewitem() {
    this.router.navigate(["/addItems"], {
      state: {
        uniqueunit: [
          ...new Set(
            this.itemList.map((j) => {
              return j.unit;
            })
          ),
        ],
      },
    });
  }

  getItem() {
    this.spinner.show();
    this.authService.itemList().subscribe((result) => {
      console.log("itemsssssssssssssssssss>>>>>>>>>>>>s", result);
      if (result["success"]) {
        console.log(result);
        this.itemList = result.data;

        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }
  deleteItem(data: any) {
    console.log(data.id);
    this.spinner.show();
    this.authService.deleteItem({ id: data.id }).subscribe((result) => {
      if (result["success"]) {
        this.getItem();
        this.settingspage = false;
        this.spinner.hide();
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
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
          timer: 2000,
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

  removeimage() {
    this.imageSrc = null;
  }

  setActiveTab = (v) => {
    this.activetab = v;
  };

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
