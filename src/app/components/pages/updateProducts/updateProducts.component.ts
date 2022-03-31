import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
@Component({
  selector: 'app-updateProducts',
  templateUrl: './updateProducts.component.html',
  styleUrls: ['./updateProducts.component.css']
})

export class UpdateProductsComponent implements OnInit {
  updateForm: FormGroup;
  submitted = false;
  companyList: any;
  isActive: any = true;
  imageSrc: string;
  allData: any = history.state.data;
  pagination = {
    "search": "",
    "page": '',
    "countPerPage": '',
    "sort_by": "name",
    "sort_direction": "ASC",
    "totalCount": 0
  }
 
  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService,private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      ProductName: ['', Validators.required],
      CompanyName: ['', Validators.required],
      Productcode: [''],
      Length: [''],
      Width: [''],
      Height: [''],
      Diameter: [''],
      Weight: [''],
      Price: [''],
      Units: [''],
      Process: [''],
      Valid_Date: [''],
      Notes: [''],
      itemId: [''],
      photos: ['']
      // photos: this.formBuilder.array([])
    });
   }
  ngOnInit(): void {
    console.log(this.allData)
    this. getCompany();
    this.updateForm.patchValue({
      ProductName:this.allData.name,
      CompanyName: this.allData.companyId,
      Productcode: this.allData.productCode,
      Length: this.allData.length,
      Width: this.allData.width,
      Height:this.allData.height,
      Diameter: this.allData.diameter,
      Weight: this.allData.weight,
      Price: this.allData.price,
      Units: this.allData.units,
      Process: this.allData.process,
      Valid_Date: this.allData.validFromDate,
      Notes: this.allData.notes,
      itemId: this.allData.itemId,
      photos: this.allData.imageUrl,
      // photos: this.formBuilder.array([])
    });

   
  
  }
  getCompany() {
    this.authService.getCompanyList(this.pagination).subscribe(result => {
      if (result['success']) {
        this.companyList = result['data'].companyList;
        this.pagination.totalCount = result['data'].totalCount;
      } else {
        this.toastr.error(result['message']);
      }
    })
  }
  
  get f() { return this.updateForm.controls; }

   // We will create multiple form controls inside defined form controls photos.
   createItem(data): FormGroup {
    return this.formBuilder.group(data);
  }

  //Help to get all photos controls as form array.
  get photos(): FormArray {
    console.log(this.updateForm);
    return this.updateForm.get('photos') as FormArray;
  };

  onSubmit() {
    this.submitted = true;
    if (this.updateForm.invalid) {
        return;
    }else{
      console.log(this.updateForm.value)
      let formData: any = new FormData();
      formData.append("companyId", this.updateForm.value.CompanyName);
      formData.append("Product Name", this.updateForm.value.ProductName);
      formData.append("Product code", this.updateForm.value.Productcode);
      formData.append("Length", this.updateForm.value.Length);
      formData.append("Width", this.updateForm.value.Width);
      formData.append("Height", this.updateForm.value.Height);
      formData.append("Diameter", this.updateForm.value.Diameter);
      formData.append("Weight", this.updateForm.value.Weight);
      formData.append("Price", this.updateForm.value.Price);
      formData.append("Unit(s)",this.updateForm.value.Units);
      formData.append("Process", this.updateForm.value.Process);
      formData.append("Valid_Date", this.updateForm.value.Valid_Date);
      formData.append("Notes", this.updateForm.value.Notes);
      formData.append("itemId", this.updateForm.value.itemId);
      formData.append('image', this.updateForm.value.photos);
      formData.append('isActive', this.isActive);
      this.authService.editItems(formData).subscribe(result => {
        if (result['success']) {
          this.router.navigate(['/products']);
          this.toastr.success(result['message']);
          
        } else {
          this.toastr.error(result['message']);
        }
      })

    }
  }

  onReset() {
    this.submitted = false;
    this.updateForm.reset();
    this.router.navigate(['/products']);

  }
  // detectFiles(event) {
  //   let files = event.target.files;
  //   if (files) {
  //     for (let file of files) {
  //       let reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         console.log("e.target.result", e.target.result);
  //           this.photos.push(this.createItem({
  //               file,
  //               url: e.target.result  
  //           }));
  //       }
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  // removePhoto(i){
	// 	this.photos.removeAt(i);
	// }

  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
      //  console.log(event.target.files[0].name)
        this.updateForm.patchValue({
          photos: event.target.files[0].name
        });
   
      };
   
    }
  }
}
