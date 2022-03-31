import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.css"],
})
export class JobsComponent implements OnInit {
  addressForm: FormGroup;
  submitted = false;
  AddressInfo: any;
  showDropDownAllJobs: boolean = false;
  showDropDownSortBy: boolean = false;
  settingspage = false;
  selectedUser: any = {};
  selectedUseredit: any = {};
  activetab = "invoice";
  jobList: any;
  apiUrl = environment.apiUrl3;
  selectedJob :any = {}
  showAllJObFilters1 = false

  BusinessList = [{ name: "Staff", id: "2" }];
  stateList = [
    { name: "Maharashtra", id: "1" },
    { name: "Madhya Pradesh", id: "2" },
    { name: "Rajasthan", id: "3" },
    { name: "Delhi", id: "4" },
  ];
  loginUser: any;
  inviteuserModel: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs() {
    this.authService.jobList().subscribe((result) => {
      if (result["success"]) {
        this.jobList = result.data;
        console.log("this.jobList", this.jobList);
      }
    });
  }
  deleteJob(data: any) {
    console.log("dddddelete JObbbbb", data);
    this.authService
      .deleteJob({ invoice_id: data.invoice_id })
      .subscribe((result) => {
        if (result["success"]) {
          this.getJobs();
          this.router.navigate(["/jobs"]);
          this.settingspage = false;
        }
      });
  }

  handleSelectJob(job){
    this.selectedJob = job
  }

  mySettingsOpen = () => {
    this.settingspage = true;
  };

  mySettingsClose = () => {
    this.settingspage = false;
  };

  gotoAddJobs(data: any) {
    this.router.navigate([`/jobsadd/${data?.invoice_id}`], {
      state: { data: data },
    });
  }

  openinviteUser() {
    this.inviteuserModel = true;
  }

  toggleAllJobFilters1(){
    this.showAllJObFilters1 = !this.showAllJObFilters1;
  }

  openDropdown() {
    this.showDropDownAllJobs = !this.showDropDownAllJobs;
  }

  openDropDownSortBy() {
    this.showDropDownSortBy = !this.showDropDownSortBy;
  }

  setActiveTab = (v) => {
    console.log("setActiveTab function called!!", v);
    this.activetab = v;
  };
}
