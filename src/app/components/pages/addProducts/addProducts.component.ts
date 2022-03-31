import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
@Component({
  selector: 'app-addProducts',
  templateUrl: './addProducts.component.html',
  styleUrls: ['./addProducts.component.css']
})

export class AddProductsComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  companyList: any;
  isActive: any = true;
  company: any = false;
  imageSrc: string;
  pagination = {
    "search": "",
    "page": '',
    "countPerPage": '',
    "sort_by": "name",
    "sort_direction": "ASC",
    "totalCount": 0
  }
 
  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService,private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this. getCompany();
    this.addForm = this.formBuilder.group({
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
      photos: ['']
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
  
  get f() { return this.addForm.controls; }

   // We will create multiple form controls inside defined form controls photos.
   createItem(data): FormGroup {
    return this.formBuilder.group(data);
  }

  //Help to get all photos controls as form array.
  // get photos(): FormArray {
  //   console.log(this.addForm);
  //   return this.addForm.get('photos') as FormArray;
  // };

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
        return;
    }else{
      console.log(this.addForm.value)
      let formData: any = new FormData();
      formData.append("companyId", this.addForm.value.CompanyName);
      formData.append("Product Name", this.addForm.value.ProductName);
      formData.append("Product code", this.addForm.value.Productcode);
      formData.append("Length", this.addForm.value.Length);
      formData.append("Width", this.addForm.value.Width);
      formData.append("Height", this.addForm.value.Height);
      formData.append("Diameter", this.addForm.value.Diameter);
      formData.append("Weight", this.addForm.value.Weight);
      formData.append("Price", this.addForm.value.Price);
      formData.append("Unit(s)",this.addForm.value.Units);
      formData.append("Process", this.addForm.value.Process);
      formData.append("Valid_Date", this.addForm.value.Valid_Date);
      formData.append("Notes", this.addForm.value.Notes);
      formData.append('image', this.addForm.value.photos);
      formData.append('isActive', this.isActive);
      this.authService.addItems(formData).subscribe(result => {
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
    this.addForm.reset();
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
        this.addForm.patchValue({
          photos: event.target.files[0].name
        });
   
      };
   
    }
  }
}
