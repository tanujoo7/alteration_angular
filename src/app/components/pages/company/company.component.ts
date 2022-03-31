import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import $ from "jquery";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {
  companyList: any;
  authToken: any;
  modelTrue= false;
  proData:any;

  pagination = {
    "search": "",
    "page": 1,
    "countPerPage": 10,
    "sort_by": "name",
    "sort_direction": "ASC",
    "totalCount": 0
  }
  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.authToken = localStorage.getItem('token');
    this.getCompany();
  };
  open(data){ 
    console.log(data)
    this.proData =data
       $('.openmodale').click(function (e) {
         e.preventDefault();
         $('.modale').addClass('opened');
     });
     $('.closemodale').click(function (e) {
         e.preventDefault();
         $('.modale').removeClass('opened');
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

  onSearch(value) {
    this.pagination.search = value;
    this.getCompany();
  }

  onSort(colName: any) {
    if (this.pagination.sort_by != colName) this.pagination.sort_direction = 'ASC';
    else this.pagination.sort_direction = this.pagination.sort_direction === 'ASC' ? 'DESC' : 'ASC';
    this.pagination.sort_by = colName;
    this.getCompany();
  }

  ChnageCompanyStatus(id) {
    console.log(id)
    let data = {
      companyId: id,
      token: this.authToken
    }
    this.authService.changeStatus(data).subscribe(result => {
      if (result['success']) {

      } else {
        this.toastr.error(result['message']);
      }
    })
  }

  pageChanged(event) {
    this.pagination.page = event;
    this.getCompany();
  }
  gotoupdateCompany(data: any) {
    this.router.navigate(['/editCompany'], { state: { data: data, artefacts: data.artefacts } });
  }

  delete(item) {
    let data={ itemId:item}
     this.authService.companyDeletes(data).subscribe(result => {
       if (result['success']) {
         this.toastr.success(result['message']);
         this.getCompany();
 
         
       } else {
         this.toastr.error(result['message']);
         
       }
     })
   }
}
