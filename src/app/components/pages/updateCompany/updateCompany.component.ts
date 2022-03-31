import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-updateCompany',
  templateUrl: './updateCompany.component.html',
  styleUrls: ['./updateCompany.component.css']
})

export class UpdateCompanyComponent implements OnInit {
  update: FormGroup;
  submitted = false;
  allData: any = history.state.data;
  
  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService,private formBuilder: FormBuilder,private route: ActivatedRoute,) {
    this.update = this.formBuilder.group({
      companyName: ['', Validators.required],
      companyId: ['', Validators.required],
    });
   }
  ngOnInit(): void {
    console.log(this.allData)
    this.update.patchValue({
      companyName: this.allData.name,
      companyId: this.allData.companyId,
    })
  
  };

  get f() { return this.update.controls; }

  onSubmit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.update.invalid) {
        return;
    }else{
      let data={
        companyName: this.update.value.companyName,
        companyId: this.update.value.companyId
      }
      this.authService.editCompanys(data).subscribe(result => {
        if (result['success']) {
          this.router.navigate(['/company']);

          this.toastr.success(result['message']);
          
        } else {
          this.toastr.error(result['message']);
        }
      })

    }
  }

  onReset() {
    this.submitted = false;
    this.update.reset();
    this.router.navigate(['/company']);

  }
}
