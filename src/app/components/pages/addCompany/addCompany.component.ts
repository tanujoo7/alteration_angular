import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-addCompany',
  templateUrl: './addCompany.component.html',
  styleUrls: ['./addCompany.component.css']
})

export class AddCompanyComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService,private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      companyName: ['', Validators.required],
    });
  
  };

  get f() { return this.addForm.controls; }

  onSubmit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
        return;
    }else{
      let data={
        companyName: this.addForm.value.companyName
      }
      this.authService.addCompanys(data).subscribe(result => {
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
    this.addForm.reset();
    this.router.navigate(['/company']);
  }
}
