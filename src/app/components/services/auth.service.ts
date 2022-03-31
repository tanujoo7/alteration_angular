import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authToken: any;

  private getUserDetails = environment.apiUrl3 + "/user/detail";
  private getItems = environment.apiUrl3 + "/items/get-all";
  private getAllItemListApi = environment.apiUrl3 + "/items/get-all";
  private addNewItemApi = `${environment.apiUrl3}/items/createitem`;
  // private apiUserCheck = environment.apiUrl + "/api/auth/checkusername";
  // private registration = environment.apiUrl + "/api/authentication/register";
  // private apilogin = environment.apiUrl + "/api/auth/login";
  // private getUserDetails = environment.apiUrl + "/api/user/detail";
  // private getItems = environment.apiUrl + "/api/item/get";
  private getCompany = environment.apiUrl + "/api/company/get";
  private toggleStatus = environment.apiUrl + "/api/company/toggleStatus";
  private addCompany = environment.apiUrl + "/api/company/create";
  private editCompany = environment.apiUrl + "/api/company/update";
  private companyDelete = environment.apiUrl + "/api/company/delete";

  private addItem = environment.apiUrl + "/api/item/create";
  private editItem = environment.apiUrl + "/api/item/update";
  private itemDelete = environment.apiUrl + "/api/item/delete";

  private updateImage = environment.apiUrl + "/api/user/updateImage";
  private getUsers = environment.apiUrl + "/api/user/get/list";
  // private editProfile = environment.apiUrl + "/api/user/update";

  /**
   ****************Profile Page endpoints*******************!
   */
  private editUser = environment.apiUrl3 + "/user/update-user-profile";
  private addExtraMobileNumber =
    environment.apiUrl3 + "/user/add-extra-mobile-number";
  private deleteExtraMobileNumber =
    environment.apiUrl3 + "/user/delete-extra-mobile-number";
  private addExtraEmailAddress =
    environment.apiUrl3 + "/user/add-extra-email-address";
  private deleteExtraEmailAddress =
    environment.apiUrl3 + "/user/delete-extra-email-address";
  /**
   ****************User&roles Services endpoints*******************!
   */
  private InviteUser = environment.apiUrl3 + "/user/inviteuser";
  private getUserList = environment.apiUrl3 + "/user/get-users-list";
  private toggleUser = environment.apiUrl3 + "/user/toggleuser";
  private deleteuser = environment.apiUrl3 + "/user/deleteuser";
  private UpdateUser = environment.apiUrl3 + "/user/updateuser";

  /**
   ****************User Auth Services endpoints*******************!
   */
  private apiUserCheck = environment.apiUrl3 + "/user/checkusername";
  private registration = environment.apiUrl3 + "/user/signup";
  private apilogin = environment.apiUrl3 + "/user/signin";
  // ---------------------
  private forgotpassword = environment.apiUrl + "/api/auth/forgotpassword";
  private setpassword = environment.apiUrl + "/api/auth/setpassword";
  private submitotp = environment.apiUrl + "/api/auth/submitotp";

  private _isAuthenticated: boolean;
  constructor(private http: HttpClient, private router: Router) {
    this._isAuthenticated = false;
    this.authToken = localStorage.getItem("token");
  }
  getheder() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Content-Length": "126",
      }),
    };
  }
  getheaderforAddress() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Content-Length": "350",
      }),
    };
  }
  getJSONHeader = () => {
    let token: any = localStorage.getItem("token");
    console.log(token);
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };
  };

  getJSONHeaderNewAPI = () => {
    let token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55aWQiOjI0LCJpZCI6MjAsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjM0ODY5OTU2fQ.YxEibXeEPOLOPRW53CI70dfY6BjuOdfpKtl_7LinyJ4";

    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    };
  };

  getJSONHeaderNewUploadAPI = () => {
    let token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55aWQiOjI0LCJpZCI6MjAsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjM0ODY5OTU2fQ.YxEibXeEPOLOPRW53CI70dfY6BjuOdfpKtl_7LinyJ4";

    return {
      headers: new HttpHeaders({ Authorization: token }),
    };
  };

  userCheck(data): Observable<any> {
    return this.http.post(this.apiUserCheck, data).pipe(
      map((result) => {
        console.log("resultresultresult", result);
        return result;
      })
    );
  }

  forgotpasswords(data): Observable<any> {
    return this.http.post(this.forgotpassword, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  submitOtp(data): Observable<any> {
    return this.http.post(this.submitotp, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  setpasswords(data): Observable<any> {
    return this.http.post(this.setpassword, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  registrations(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.registration, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  login(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.apilogin, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getUserDetail(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.getUserDetails, data, this.getJSONHeader()).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getCompanyList(data): Observable<any> {
    return this.http.post(this.getCompany, data, this.getJSONHeader()).pipe(
      map((result) => {
        return result;
      })
    );
  }

  changeStatus(data): Observable<any> {
    console.log("Data", data);
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: data.token,
      }),
    };
    let apidata = {
      companyId: data.companyId,
    };
    return this.http.post(this.toggleStatus, apidata, httpOptionsAuth).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getUsersList(data): Observable<any> {
    console.log("Data", data);

    return this.http.post(this.getUsers, data, this.getJSONHeader()).pipe(
      map((result) => {
        return result;
      })
    );
  }

  editUsers(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.editUser, data, this.getJSONHeader()).pipe(
      map((result) => {
        return result;
      })
    );
  }

  addUsersMobileNumber(data): Observable<any> {
    // console.log("Data", data);
    return this.http
      .post(this.addExtraMobileNumber, data, this.getJSONHeader())
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  DeleteUsersMobileNumber(data): Observable<any> {
    // console.log("Data", data);
    return this.http
      .post(this.deleteExtraMobileNumber, data, this.getJSONHeader())
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  DeleteUsersEmailAddress(data): Observable<any> {
    // console.log("Data", data);
    return this.http
      .post(this.deleteExtraEmailAddress, data, this.getJSONHeader())
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  addUsersEmailAddress(data): Observable<any> {
    return this.http
      .post(this.addExtraEmailAddress, data, this.getJSONHeader())
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getItemList(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.getItems, data, this.getJSONHeader()).pipe(
      map((result) => {
        return result;
      })
    );
  }

  addCompanys(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.addCompany, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  editCompanys(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.editCompany, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  addItems(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.addItem, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  editItems(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.editItem, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  updateImages(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.updateImage, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  itemDeletes(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.itemDelete, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  companyDeletes(data): Observable<any> {
    console.log("Data", data);
    return this.http.post(this.companyDelete, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  // edituserProfile(data): Observable<any> {
  //   console.log("Data", data);
  //   return this.http.post(this.editProfile, data, this.getheder()).pipe(
  //     map((result) => {
  //       return result;
  //     })
  //   );
  // }

  editAddress(data): Observable<any> {
    console.log("Data", data);
    return this.http
      .post(
        `${environment.apiUrl3}/user/update-organization-profile`,
        data,
        this.getJSONHeader()
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  userList(): Observable<any> {
    return this.http.get(this.getUserList, this.getJSONHeader());
    // .pipe(
    //   map((result) => {
    //     return result;
    //   })
    // );
  }

  customerList(): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl3}/customer/getcustomerlist`,
        {},
        this.getJSONHeader()
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  jobList(): Observable<any> {
    return this.http
      .post(`${environment.apiUrl3}/job/get-job-list`, {}, this.getJSONHeader())
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  customerById(id: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl3}/customer/get-customer-id`,
        { id: id },
        this.getJSONHeader()
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  jobById(id: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl3}/job/get-job-by-id`,
        { invoice_id: id },
        this.getJSONHeader()
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  addCustomer(data): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl3}/customer/createcustomer`,
        data,
        this.getJSONHeader()
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  /************************* Invoice  page servicess *******************************/
  addJob(data): Observable<any> {
    let token: any = localStorage.getItem("token");
    let header = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .post(`${environment.apiUrl3}/job/create-job`, data, header)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  updateJob(data: any): Observable<any> {
    let token: any = localStorage.getItem("token");
    let header = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .post(`${environment.apiUrl3}/job/update-job`, data, header)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  updateCustomer(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl3}/customer/updatecustomer`,
        data,
        this.getJSONHeader()
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  deletecustomer(data: any) {
    return this.http
      .post(
        `${environment.apiUrl3}/customer/deletecustomer`,
        data,
        this.getJSONHeader()
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  deleteJob(data: any) {
    return this.http
      .post(`${environment.apiUrl3}/job/delete-job`, data, this.getJSONHeader())
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  itemList(): Observable<any> {
    console.log("itemLlist observable called!");
    return this.http.get(this.getAllItemListApi, this.getJSONHeader());
  }

  addItemNew(data): Observable<any> {
    let token: any = localStorage.getItem("token");
    let header = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(this.addNewItemApi, data, header).pipe(
      map((result) => {
        return result;
      })
    );
  }

  addUnit(data): Observable<any> {
    return this.http
      .post(`${environment.apiUrl3}/items/add-unit`, data, this.getJSONHeader())
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  unitList(): Observable<any> {
    console.log("itemLlist observable called!");
    return this.http.get(
      `${environment.apiUrl3}/items/get-all-units`,
      this.getJSONHeader()
    );
  }

  DeleteItemsUnit(data): Observable<any> {
    // console.log("Data", data);
    return this.http
      .post(
        `${environment.apiUrl3}/items/delete-unit`,
        data,
        this.getJSONHeader()
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  uploadItemImage(data): Observable<any> {
    return this.http
      .post(`${environment.apiUrl3}/imageupload`, data, this.getJSONHeader())
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  deleteItem(data: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl3}/items/delete-item`,
        data,
        this.getJSONHeader()
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  updateItem(data: any): Observable<any> {
    let token: any = localStorage.getItem("token");
    let header = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .post(`${environment.apiUrl3}/items/update-item`, data, header)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  toggleUserAPI(data: any): Observable<any> {
    return this.http.post(this.toggleUser, data, this.getJSONHeader()).pipe(
      map((result) => {
        return result;
      })
    );
  }

  deleteUserAPI(data: any): Observable<any> {
    return this.http.post(this.deleteuser, data, this.getJSONHeader()).pipe(
      map((result) => {
        return result;
      })
    );
  }

  inviteUser(data: any): Observable<any> {
    return this.http.post(this.InviteUser, data, this.getJSONHeader()).pipe(
      map((result) => {
        return result;
      })
    );
  }

  updateuser(data: any): Observable<any> {
    return this.http.post(this.UpdateUser, data, this.getJSONHeader()).pipe(
      map((result) => {
        return result;
      })
    );
  }

  check(): Observable<boolean> {
    if (localStorage.getItem("auth-token")) {
      return of(true);
    } else {
      return of(false);
    }
  }

  Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigate(["/home"]);
  }
}
