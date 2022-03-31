import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import $ from "jquery";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  itemList:any;
  productListView=true;
  productListGrid=false;
  companyList: any;
  proData:any;
  hideme: boolean[] = [];
  paginations = {
    "search": "",
    "page": '',
    "countPerPage": '',
    "sort_by": "name",
    "sort_direction": "ASC",
    "totalCount": 0
  }
  pagination = {
    "search": "",
    "page": 1,
    "countPerPage": 10,
    "sort_by": "name",
    "sort_direction": "ASC",
    "totalCount": 0,
    "companyId":'1'
  }
  constructor(private router: Router,private authService: AuthService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getItems();
    this.getCompany();
  };
  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }
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
    this.authService.getCompanyList(this.paginations).subscribe(result => {
      if (result['success']) {
        this.companyList = result['data'].companyList;
        this.pagination.totalCount = result['data'].totalCount;
      } else {
        this.toastr.error(result['message']);
      }
    })
  }

  getItems() {
    this.authService.getItemList(this.pagination).subscribe(result => {
      if (result['success']) {
        this.itemList = result['data'].itemList;
        this.pagination.totalCount = result['data'].totalCount;
        this.itemList.forEach(function (value) {
          let apiim='http://localhost:3005/';
          value.imgUrl=apiim+value.imgUrl
      });
        
      
        
      } else {
        this.toastr.error(result['message']);
        
      }
    })
  }

  onSearch(value) {
    console.log(value);
    this.pagination.search=value;
    this.pagination.companyId=value;

    this.getItems();
  }

  onSort(colName: any) {
    if (this.pagination.sort_by != colName) this.pagination.sort_direction = 'ASC';
    else this.pagination.sort_direction = this.pagination.sort_direction === 'ASC' ? 'DESC' : 'ASC';
    this.pagination.sort_by = colName;
    this.getItems();
  }
  pageChanged(event) {
    this.pagination.page = event;
    this.getItems();
  }

  listGrid(){
   this.productListGrid=true;
   this.productListView =false;
  }

  listView(){
    this.productListView =true;
   this.productListGrid=false;
  }

  gotoupdateProduct(data: any) {
    this.router.navigate(['/editProduct'], { state: { data: data, artefacts: data.artefacts } });
  }

  delete(itemId) {
   let data={ itemId:itemId}
   console.log(data);
    this.authService.itemDeletes(data).subscribe(result => {
      if (result['success']) {
        this.toastr.success(result['message']);
        this.getItems();

        
      } else {
        this.toastr.error(result['message']);
        
      }
    })
  }

}
