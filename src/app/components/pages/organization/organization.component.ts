import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  loginUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserDetail({ userId: localStorage.getItem('userId') }).subscribe(result => {
      if (result['success']) {
        this.loginUser = result['data'].user[0];
      }
    })
  }
}
