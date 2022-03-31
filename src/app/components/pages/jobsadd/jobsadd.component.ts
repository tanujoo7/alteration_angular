import { Component, OnInit, OnChanges, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { formatDate } from "@angular/common";

// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: "app-jobsAdd",
  templateUrl: "./jobsadd.component.html",
  styleUrls: ["./jobsadd.component.css"],
})
export class JobsaddComponent implements OnInit {
  @Input() data: string;
  invoiceForm: FormGroup;
  showCustomerAddress: boolean = false;
  selectedCustomerName: any;
  selectedCustomerId: any;
  selectedCustomerAddress: any = [];
  submitted = false;
  show_item_name = false;
  show_item_list: boolean = false;
  showCustomerDetails_popUp: boolean = false;
  show_other_details_content: boolean = false;
  show_contact_person_details: boolean = false;
  show_address_details: boolean = true;
  show_person_activity_details: boolean = false;
  selected_item_name: any;
  selectedDataCustomerName: any;
  selected_item: any;
  AddressInfo: any;
  itemList: any;
  itemList1: any;
  file: any;
  imageSrc: any;
  totalAmount: number = 0;
  editedJobId: string | null = null;
  BusinessList = [{ name: "Staff", id: "2" }];
  stateList = [
    { name: "Maharashtra", id: "1" },
    { name: "Madhya Pradesh", id: "2" },
    { name: "Rajasthan", id: "3" },
    { name: "Delhi", id: "4" },
  ];
  dropdownOptions = ["Due on Recipet", "Net 15", "Net 30", "Net 45", "Net 60"];
  customer_name_list: any = [];
  config = {
    search: true,
    height: "auto",
    placeholder: "Select time",
    noResultsFound: "No results found!",
    searchPlaceholder: "Search",
    clearOnSelection: true,
  };
  config1 = {
    search: true,
    height: "auto",
    placeholder: "Select Customer",
    noResultsFound: "No results found!",
    searchPlaceholder: "Search",
    clearOnSelection: true,
    displayKey: "firstname",
    searchOnKey: "firstname",
    multiple: false,
  };
  countryList = [{ name: "india", id: "1" }];
  loginUser: any;
  allData: any = history.state.data;
  user: any;
  items: FormArray;
  associated_Items: any;
  edit_job: boolean = false;
  gstAmount: number = 0
  apiUrl = environment.apiUrl3;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute // private SelectDropDownModule: SelectDropDownModule
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap);
    this.editedJobId = this.route.snapshot.paramMap.get("id");



    let date = new Date();
    date.setDate(date.getDate() + 2);
    this.invoiceForm = this.formBuilder.group({
      CustomerName: ["", Validators.required],
      InvoiceNo: [""],
      JobNo: ["", Validators.required],
      JobDate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      DueDate: [formatDate(date, 'yyyy-MM-dd', 'en'), Validators.required],
      PickUpTime: ["16:00"],
      IncludeGST: [15],
      Adjustment: [""],
      Total: [""],
      CustomerNotes: [""],
      AttachFile: [""],
      TermsAndConditions: [""],
      job_status: ["New"],
      items: new FormArray([this.createItem()]),
    });

    if (this.editedJobId != "null") {
      this.edit_job = true;
      this.getJobById();
    }

    console.log("ngOnInit Triggerssss");
    this.user = localStorage.getItem("userId");
    var data = {
      userId: this.user,
    };
    this.authService.getUserDetail(data).subscribe((result) => {
      if (result["success"]) {
        this.loginUser = result["data"].user[0];
      } else {
      }
    });
    
    this.getCustomerNameList();
    this.invoiceForm.get('IncludeGST')?.valueChanges.subscribe(x=>{
      this.gstAmount = this.totalAmount * (x/100);
    })

    this.invoiceForm.get('IncludeGST')?.disable();
  }

  showCustomerDetails_popUp_Open() {
    this.showCustomerDetails_popUp = true;
  }

  showCustomerDetails_popUp_Close() {
    this.showCustomerDetails_popUp = false;
  }

  get itemsElement(): FormArray {
    return this.invoiceForm.get("items") as FormArray;
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      item_id: "",
      itemName: "",
      Amount: 0,
      Rate: 0,
      ItemDetails: "",
      Quantity: 1,
      isItemsDropdown: false,
      imgurl: '',
      itemListText: "",
    });
  }

  get capValues(): FormArray {
    return this.invoiceForm.get("items") as FormArray;
  }

  getSum() {
    this.totalAmount = this.capValues.value.reduce(
      (prev, next) => prev + +next.fdnTotalShares,
      0
    );
  }

  addItem(): void {
    this.items = this.invoiceForm.get("items") as FormArray;
    this.items.push(this.createItem());
  }

  getJobById() {
    this.spinner.show();
    this.authService.jobById(this.editedJobId).subscribe((result) => {
      console.log("resultttt 143this.editedJobId", result);
      if (result["success"]) {
        this.authService
          .customerById(result.data.customer_id)
          .subscribe((result) => {
            this.selectedDataCustomerName = result.data;
          });
        console.log(result);
        this.allData = result.data;
        this.associated_Items = result.data.associatedItems;
        this.selectedCustomerName = result.data.firstname;
        this.selectedCustomerAddress = result.data.addresses;
        this.selectedCustomerId = result.data.id;
        this.invoiceForm.patchValue({
            CustomerName: result.data.firstname,
        });
        this.showCustomerAddress = true;
        if (result.data.associatedItems.length > 0) {
          this.letPatchFields(result.data.associatedItems);
        } else {
          this.letPatchFields(null);
        }
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  letPatchFields(associatedItems) {
    if(associatedItems){
      this.invoiceForm.patchValue({
        CustomerName: this.allData?.customer_name,
        InvoiceNo: this.allData?.invoice_id,
        JobNo: this.allData?.job_number,
        JobDate: this.allData?.job_date,
        PickUpTime: this.allData?.pick_up_time,
        DueDate: this.allData?.due_date,
        ItemDetails: this.allData?.item_details,
        Quantity: this.allData?.quantity,
        Rate: this.allData?.rate,
        Amount: this.allData?.amount,
        Total: this.allData?.total,
        IncludeGST: this.allData?.include_gst,
        CustomerNotes: this.allData?.customer_notes,
        TermsAndConditions: this.allData?.tc,
        AttachFile: this.allData?.attached_file,
      });
  
      if (associatedItems.length > 0) {
        this.invoiceForm.setControl(
          "items",
          this.setItemsInForm(associatedItems)
        );
      }
    }
  }

  setItemsInForm(items): FormArray {
    const formArray = new FormArray([]);
    items.forEach((element) => {
      formArray.push(
        this.formBuilder.group({
          item_id: "",
          itemName: element.name,
          Amount: +element.sellingprice * +element.quantity,
          Rate: element.sellingprice,
          ItemDetails: element.item_description,
          Quantity: element.quantity,
          isItemsDropdown: false,
          imgurl: items.imgurl
        })
      );
      this.totalAmount = this.totalAmount + (+element.sellingprice * +element.quantity);
      let gst = +this.invoiceForm.get('IncludeGST')?.value
      this.gstAmount = this.totalAmount - (this.totalAmount / 1.15);
    });
    return formArray;
  }

  getCustomerNameList() {
    this.authService.customerList().subscribe((result) => {
      if (result["success"]) {
        if (result["data"].length <= 0) {
        }
        this.spinner.hide();
        this.customer_name_list = result.data;
      } else {
        this.spinner.hide();
      }
    });
  }

  getItem() {
    this.spinner.show();
    this.authService.itemList().subscribe((result) => {
      if (result["success"]) {
        this.itemList = result.data;
        this.itemList1 = this.itemList
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  showItemList(i: AbstractControl) {
    if(!i.get('itemName')?.value){
      this.getItem();
      this.show_item_list = !this.show_item_list;
      i.get("isItemsDropdown")?.patchValue(true);
    }
  }

  cloneSelectedItem(i: AbstractControl){
    this.items = this.invoiceForm.get("items") as FormArray;
    
    let formGroup : FormGroup = this.formBuilder.group({
      item_id: i.get('item_id')?.value,
      itemName: i.get('itemName')?.value,
      Amount: i.get('Amount')?.value,
      Rate: i.get('Rate')?.value,
      ItemDetails: i.get('ItemDetails')?.value,
      Quantity: i.get('Quantity')?.value,
      isItemsDropdown: false,
    });
    this.items.push(formGroup);
    this.totalAmount = this.totalAmount + i.get('Amount')?.value
    let gst = +this.invoiceForm.get('IncludeGST')?.value
    this.gstAmount = this.totalAmount - (this.totalAmount / 1.15);
  }

  handleQuantityChange(i: AbstractControl) {
    let oldPrice = i.get("Amount")?.value;
    i.get("Amount")?.setValue(i.get("Rate")?.value * i.get("Quantity")?.value);
    i.get("Total")?.setValue(i.get("Amount")?.value);
    this.totalAmount = this.totalAmount-oldPrice;
    this.totalAmount = this.totalAmount + (i.get("Rate")?.value * i.get("Quantity")?.value)
    let gst = +this.invoiceForm.get('IncludeGST')?.value
    this.gstAmount = this.totalAmount - (this.totalAmount / 1.15);
  }

  handleRateChange(i: AbstractControl) {
    let oldPrice = i.get("Amount")?.value;
    i.get("Amount")?.setValue(i.get("Rate")?.value * i.get("Quantity")?.value);
    i.get("Total")?.setValue(i.get("Amount")?.value);
    this.totalAmount = this.totalAmount-oldPrice;
    this.totalAmount = this.totalAmount + (i.get("Rate")?.value * i.get("Quantity")?.value)
    let gst = +this.invoiceForm.get('IncludeGST')?.value
    this.gstAmount = this.totalAmount - (this.totalAmount / 1.15);
  }

  handleAmountChange() {
    console.log("Amount changes", this.invoiceForm.value?.Amount);
  }

  selectedItem(item, i: AbstractControl) {
    this.selected_item_name = item.name;
    this.show_item_name = true;
    this.show_item_list = !this.show_item_list;
    console.log("selected item id", item.id);
    i.patchValue({
      item_id: item.id,
      itemName: item.name,
      Rate: +item.sellingprice,
      ItemDetails: "",
      Quantity: 1,
      Amount: +item.sellingprice,
      isItemsDropdown: false,
      imgurl: item.imgurl
    });
    i.get("Amount")?.disable();
    this.totalAmount = this.totalAmount + (+item.sellingprice)
    let gst = +this.invoiceForm.get('IncludeGST')?.value
    this.gstAmount = this.totalAmount - (this.totalAmount / 1.15);
  }

  get f() {
    return this.invoiceForm.controls;
  }

  returnTodaysDate() {}

  selectionChangedPickUpTime(event) {
    // this.invoiceForm.value.PickUpTime = event.value;
    // this.invoiceForm.setValue('PickUpTime')
    this.invoiceForm.controls["PickUpTime"].setValue(event.value);
  }

  customerNameSelected(event) {
    this.selectedCustomerName = event.value.firstname;
    this.selectedCustomerAddress = event.value.addresses;
    this.selectedCustomerId = event.value.id;
    this.invoiceForm.patchValue({
      CustomerName: event.value.firstname,
    });
    if (Object.keys(event.value).length > 0) {
      this.showCustomerAddress = true;
    }
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

  addInvoice() {
    console.log("addInvoice addIn");
    this.submitted = true;
    if (this.invoiceForm.invalid) {
      console.log("ffffffffffffffform is invalidddddddddd");
      return;
    } else {
      if (this.edit_job) {
        console.log("entered in if block of form-Submission", this.editedJobId);
        let formData = new FormData();
        let userId: any = localStorage.getItem("userId");
        if (this.file) {
          formData.append("image", this.file, this.file.name);
        }
        formData.append("customer_name", this.invoiceForm.value?.CustomerName);
        formData.append("customer_id", this.selectedCustomerId);
        formData.append("invoice_id", this.invoiceForm.value?.InvoiceNo);
        formData.append("job_number", this.invoiceForm.value?.JobNo);
        formData.append("job_date", this.invoiceForm.value?.JobDate);
        formData.append("due_date", this.invoiceForm.value?.DueDate);
        formData.append("pick_up_time", this.invoiceForm.value?.PickUpTime);
        formData.append("item_details", this.invoiceForm.value?.items);
        formData.append("quantity", this.invoiceForm.value?.Quantity);
        formData.append("rate", this.invoiceForm.value?.Rate);
        formData.append("amount", this.invoiceForm.value?.Amount);
        formData.append("total", this.invoiceForm.value?.Total);
        formData.append("include_gst", this.invoiceForm.value?.IncludeGST);
        formData.append("adjustment", this.invoiceForm.value?.Adjustment);
        formData.append("job_status", this.invoiceForm.value?.job_status);
        formData.append(
          "customer_notes",
          this.invoiceForm.value?.CustomerNotes
        );
        formData.append("tc", this.invoiceForm.value?.TermsAndConditions);
        formData.append(
          "items",
          JSON.stringify(this.invoiceForm.get("items")?.value)
        );
        formData.append("user_id", userId);
        // console.log("formDataformDataformData of jobsadd page", formData);

        this.authService.updateJob(formData).subscribe((result) => {
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
            this.router.navigate(["/jobs"]);
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
      } else {
        console.log("entered in else block of formSubmissionformSubmission");
        let formData = new FormData();
        if (this.file) {
          formData.append("image", this.file, this.file.name);
        }
        formData.append("customer_name", this.invoiceForm.value?.CustomerName);
        formData.append("customer_id", this.selectedCustomerId);
        // formData.append("invoice_id", this.invoiceForm.value?.InvoiceNo);
        formData.append("job_number", this.invoiceForm.value?.JobNo);
        formData.append("job_date", this.invoiceForm.value?.JobDate);
        formData.append("due_date", this.invoiceForm.value?.DueDate);
        formData.append("pick_up_time", this.invoiceForm.value?.PickUpTime);
        formData.append("item_details", this.invoiceForm.value?.items);
        formData.append("quantity", this.invoiceForm.value?.Quantity);
        formData.append("rate", this.invoiceForm.value?.Rate);
        formData.append("amount", this.invoiceForm.value?.Amount);
        formData.append("total", this.invoiceForm.value?.Total);
        formData.append("include_gst", this.invoiceForm.value?.IncludeGST);
        formData.append("adjustment", this.invoiceForm.value?.Adjustment);
        formData.append("job_status", this.invoiceForm.value?.job_status);

        formData.append(
          "customer_notes",
          this.invoiceForm.value?.CustomerNotes
        );
        formData.append("tc", this.invoiceForm.value?.TermsAndConditions);
        formData.append(
          "items",
          JSON.stringify(this.invoiceForm.get("items")?.value)
        );
        let userId: any = localStorage.getItem("userId");
        formData.append("user_id", userId);
        console.log("formDataformDataformData of jobsadd page", formData);
        this.authService.addJob(formData).subscribe((result) => {
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
            this.router.navigate(["/jobs"]);
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
    }
    this.file = "";
  }

  addAnotherLine() {
    this.addItem();
  }

  removeAnotherItemLine(index, item:AbstractControl): void {
    console.log("remove item index", index);
    const itemsFormArray = <FormArray>this.invoiceForm.get("items");
    let amount = item.get('Amount')?.value
    this.totalAmount = this.totalAmount-amount;
    let gst = +this.invoiceForm.get('IncludeGST')?.value
    this.gstAmount = this.totalAmount - (this.totalAmount / 1.15);
    itemsFormArray.removeAt(index);
    itemsFormArray.markAsDirty();
    itemsFormArray.markAsTouched();
  }

  open_other_details() {
    this.show_other_details_content = !this.show_other_details_content;
  }

  showDetails(type) {
    switch (type) {
      case "Address":
        this.show_person_activity_details = false;
        this.show_contact_person_details = false;
        this.show_address_details = true;
        console.log("Address tab clicked!");
        break;
      case "Contact":
        this.show_address_details = false;
        this.show_person_activity_details = false;
        this.show_contact_person_details = true;
        console.log("Contact tab clicked!");
        break;
      case "Activity":
        this.show_address_details = false;
        this.show_contact_person_details = false;
        this.show_person_activity_details = true;
        console.log("Activity tab clicked!");
        break;
      default:
        break;
    }
  }
}
