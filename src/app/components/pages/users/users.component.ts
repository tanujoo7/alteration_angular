import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  userList:any;
  pagination = {
    "search": "",
    "page": 1,
    "countPerPage": 10,
    "sort_by": "name",
    "sort_direction": "ASC",
    "totalCount": 0
  }
  constructor(private router: Router,private authService: AuthService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getUsers();
  };

  getUsers() {
    this.authService.getUsersList(this.pagination).subscribe(result => {
      if (result['success']) {
        this.userList = result['data'].userList;
        this.pagination.totalCount = result['data'].totalCount;
        console.log(this.userList)
        
        
      } else {
        this.toastr.error(result['message']);
        
      }
    })
  }
 
  onSearch() {
    this.getUsers();
  }

  onSort(colName: any) {
    if (this.pagination.sort_by != colName) this.pagination.sort_direction = 'ASC';
    else this.pagination.sort_direction = this.pagination.sort_direction === 'ASC' ? 'DESC' : 'ASC';
    this.pagination.sort_by = colName;
    this.getUsers();
  }
  pageChanged(event) {
    this.pagination.page = event;
    this.getUsers();
  }

  gotoupdateUser(data: any) {
    this.router.navigate(['/editUser'], { state: { data: data, artefacts: data.artefacts } });
  }

}
