import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-updateUser',
  templateUrl: './updateUser.component.html',
  styleUrls: ['./updateUser.component.css']
})

export class UpdateUserComponent implements OnInit {
  update: FormGroup;
  submitted = false;
  allData: any = history.state.data;
  
  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService,private formBuilder: FormBuilder,private route: ActivatedRoute,) {
    this.update = this.formBuilder.group({
      u_id: ['', Validators.required],
      u_role: ['', Validators.required],
      name: ['', Validators.required],
      phone: [''],
      email: ['', Validators.required],
    });
   }
  ngOnInit(): void {
    console.log(this.allData)
    this.update.patchValue({
      u_role: this.allData.u_role,
      u_id: this.allData.u_id,
      name: this.allData.name,
      phone: this.allData.phone,
      email: this.allData.email,
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
        name: this.update.value.name,
        phone: this.update.value.phone,
        u_role: this.update.value.u_role,
        userId: this.update.value.u_id,
        email: this.update.value.email,

      }
      this.authService.editUsers(data).subscribe(result => {
        if (result['success']) {
          this.router.navigate(['/users']);

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
    this.router.navigate(['/users']);

  }
}
