import { Component, HostListener, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../../environments/environment";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { ComponentCanDeactivate } from "../../services/auth.guard";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-additems",
  templateUrl: "./additems.component.html",
  styleUrls: ["./additems.component.css"],
})
// export class AdditemsComponent implements OnInit, ComponentCanDeactivate {x
export class AdditemsComponent implements OnInit {
  itemForm: FormGroup;
  apiUrl = environment.apiUrl3;
  submitted = false;
  allData: any = history.state.data;
  file: any;
  imageSrc: any;
  tempFile: any;
  menaces = history.state.uniqueunit;
  unitsData: Array<String> = [];
  units: Array<String> = [];
  unitOpen: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {}

  // @HostListener("window:beforeunload")
  // canDeactivate(): Observable<boolean> | boolean {
  //   return true;
  // }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      type: ["goods"],
      name: ["", Validators.required],
      unit: [""],
      sellingprice: ["", Validators.required],
      description: [""],
      imgurl: [""],
    });

    if (this.allData) {
      this.itemForm.patchValue({
        type: this.allData.type,
        name: this.allData?.name,
        unit: this.allData?.unit,
        sellingprice: this.allData?.sellingprice,
        description: this.allData?.description,
        imgurl: this.allData?.imgurl,
      });
    }

    if (this.allData?.imgurl)
      this.imageSrc = this.apiUrl + "/" + this.allData?.imgurl;

    // this.units = this.unitsData;
    this.itemForm.controls.unit.valueChanges.subscribe((value) =>
      this.handleUnitChange(value)
    );

    this.getUnits();
  }

  get f() {
    return this.itemForm.controls;
  }

  getUnits() {
    this.spinner.show();
    this.authService.unitList().subscribe((result) => {
      if (result["success"]) {
        console.log(result);
        result.data.map((ele, i) => {
          if (ele.unit) {
            this.units.push(ele.unit);
            this.unitsData.push(ele.unit);
          }
        });
        // this.units = result.data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
    this.spinner.hide();
  }

  deleteUnit(unit) {
    if (unit.length <= 0) {
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
        title: "Unit not found!",
      });
      return;
    } else {
      this.spinner.show();
      let data = {
        unit: unit,
      };
      this.authService.DeleteItemsUnit(data).subscribe((result) => {
        if (result["success"]) {
          // this.getUser();
          this.getUnits();
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
          this.getUnits();
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
  }

  addItem() {
    this.submitted = true;
    if (this.itemForm.invalid) {
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
        text: "please enter item details!",
      });
      return;
    } else {
      // Edititems
      this.spinner.show();
      if (this.allData?.id) {
        // this.getUnits();
        let data = {
          id: this.allData?.id,
          type: this.itemForm.value?.type,
          name: this.itemForm.value?.name,
          unit: this.itemForm.value?.unit,
          sellingprice: this.itemForm.value?.sellingprice,
          description: this.itemForm.value?.description,
        };
          let formData = new FormData();
          formData.append("id", this.allData?.id);
          if (this.file) {
            formData.append("image", this.file, this.file.name);
          }
          formData.append("type", this.itemForm.value?.type);
          formData.append("name", this.itemForm.value?.name);
          formData.append("description", this.itemForm.value?.description);
          formData.append("unit", this.itemForm.value?.unit);
          formData.append("sellingprice", this.itemForm.value?.sellingprice);

          this.authService.updateItem(formData).subscribe((result) => {
            if (result["success"]) {
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
              this.router.navigate(["/items"]);
            } else {
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
      // Additems
      else {
        let data = {
          type: this.itemForm.value?.type,
          name: this.itemForm.value?.name,
          unit: this.itemForm.value?.unit,
          sellingprice: this.itemForm.value?.sellingprice,
          description: this.itemForm.value?.description,
          image: "",
        };
        // console.log("104 create new items data", data);
          let formData = new FormData();
          if(this.file){
          formData.append("image", this.file, this.file.name);
        }
          formData.append("type", this.itemForm.value?.type);
          formData.append("name", this.itemForm.value?.name);
          formData.append("description", this.itemForm.value?.description);
          formData.append("unit", this.itemForm.value?.unit);
          formData.append("sellingprice", this.itemForm.value?.sellingprice);

          this.authService.addItemNew(formData).subscribe((result) => {
            if (result["success"]) {
              let unitData = {
                unitName: this.itemForm.value?.unit,
                item_id: result["data"].result.id,
              };
              this.authService.addUnit(unitData).subscribe((result) => {
                if (result["success"]) {
                  console.log(result);
                } else {
                  console.log("Units not added");
                }
              });
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
              this.router.navigate(["/items"]);
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

  handleUnitArrowClick() {
    this.unitOpen = !this.unitOpen;
    if (this.itemForm.controls.unit.value.length > 0) {
      this.handleUnitChange(this.itemForm.controls.unit.value);
    } else {
      this.units = this.unitsData;
    }
  }

  handleUnitOptionClick(event) {
    this.unitOpen = false;
    this.itemForm.controls.unit.setValue(event);
  }

  handleUnitChange(event: string) {
    this.units = this.unitsData.filter((x) =>
      x.toLocaleLowerCase().includes(event.toLocaleLowerCase())
    );
  }
}
