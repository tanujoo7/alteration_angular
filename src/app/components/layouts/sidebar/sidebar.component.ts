import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {
  currentUrl: any
  @ViewChild('toggle') toggle: ElementRef;
  @ViewChild('sidebar') sidebar: ElementRef;

  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    console.log(this.currentUrl)
  }

  toggleMenu = () => {
    this.toggle.nativeElement.classList.toggle('active')
    this.sidebar.nativeElement.classList.toggle('active')
  }
}
