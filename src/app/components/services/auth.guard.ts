import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: "root",
})
// implements CanActivate, CanDeactivate<ComponentCanDeactivate>
export class AuthGuard implements CanActivate {
  constructor(private routes: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("token") != null) {
      return true;
    } else {
      this.routes.navigate(["/home"]);
      return false;
    }
  }

  // canDeactivate(
  //   component: ComponentCanDeactivate
  // ): boolean | Observable<boolean> {
  //   var returnValue;
  // Swal.fire({
  //   position: "top",
  //   icon: "warning",
  //   iconColor: "#ffa500",
  //   text: "Are you sure you want to leave this page?",
  //   width: "400px",
  //   padding: 1,
  //   showConfirmButton: true,
  //   confirmButtonText: "Stay on this Page",
  //   confirmButtonColor: "#1abc9c",
  //   confirmButtonAriaLabel: "#fff",
  //   showCancelButton: true,
  //   cancelButtonText: "Leave this Page",
  // }).then((result: any) => {
  //   console.log("resultddddddddd", result);
  //   if (result.isConfirmed === true) {
  //     console.log("resultdd in is confirm block", result.isConfirmed);
  //     returnValue = result.isConfirmed;
  //   } else if (result.dismiss === "cancel") {
  //     console.log("resultdd in is else block", result.isConfirmed);
  //     returnValue = false;
  //   }
  // });
  // .then((value) => {
  //   console.log("valuebbbbbbbbbbbbbbbbbb", value);
  //   returnValue = value;
  //   console.log("returnValue", returnValue);
  // });
  //   returnValue = confirm("wanna leave of not");
  //   console.log("checkkkkkkkkkk", returnValue);
  //   return returnValue;
  // }
}
