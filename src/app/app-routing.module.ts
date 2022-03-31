import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { MiddlewareComponent } from "./components/pages/middleware/middleware.component";
import { AuthGuard } from "./components/services/auth.guard";
import { CompanyComponent } from "./components/pages/company/company.component";
import { UsersComponent } from "./components/pages/users/users.component";
import { ProductsComponent } from "./components/pages/products/products.component";
import { AddProductsComponent } from "./components/pages/addProducts/addProducts.component";
import { AddCompanyComponent } from "./components/pages/addCompany/addCompany.component";
import { UpdateCompanyComponent } from "./components/pages/updateCompany/updateCompany.component";
import { UpdateProductsComponent } from "./components/pages/updateProducts/updateProducts.component";
import { RegistrationComponent } from "./components/pages/registration/registration.component";
import { UpdateUserComponent } from "./components/pages/updateUser/updateUser.component";
import { ForgetPasswordComponent } from "./components/pages/forgetPassword/forgetPassword.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { OrganizationComponent } from "./components/pages/organization/organization.component";
import { UserAndRolesComponent } from "./components/pages/user-and-roles/user-and-roles.component";
import { ProfileComponent } from "./components/pages/profile/profile.component";
import { OrganizationProfileComponent } from "./components/pages/organization-profile/organization-profile.component";
import { SetPasswordComponent } from "./components/pages/set-password/set-password.component";
import { CustomerComponent } from "./components/pages/customer/customer.component";
import { AddcustomerComponent } from "./components/pages/addcustomer/addcustomer.component";
import { JobsaddComponent } from "./components/pages/jobsadd/jobsadd.component";
import { ItemsComponent } from "./components/pages/items/items.component";
import { AdditemsComponent } from "./components/pages/additems/additems.component";
import { JobsComponent } from "./components/pages/jobs/jobs.component";
import { PopUpModalComponent } from "./components/pages/pop-up-modal/pop-up-modal.component";
import { InvoicesComponent } from "./components/pages/invoices/invoices.component";

const routes: Routes = [
  { path: "registration", component: RegistrationComponent },
  { path: "forget-Password", component: ForgetPasswordComponent },
  { path: "setpassword/:email/:otp", component: SetPasswordComponent },
  {
    path: "",
    component: MiddlewareComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "organizations", component: OrganizationComponent },
      { path: "userroles", component: UserAndRolesComponent },
      { path: "profile", component: ProfileComponent },
      { path: "company", component: CompanyComponent },
      { path: "users", component: UsersComponent },
      { path: "products", component: ProductsComponent },
      { path: "addProducts", component: AddProductsComponent },
      { path: "addCompany", component: AddCompanyComponent },
      { path: "editCompany", component: UpdateCompanyComponent },
      { path: "editProduct", component: UpdateProductsComponent },
      { path: "editUser", component: UpdateUserComponent },
      { path: "OrganizationProfile", component: OrganizationProfileComponent },
      { path: "customer", component: CustomerComponent },
      { path: "addCutomer/:id", component: AddcustomerComponent },
      { path: "items", component: ItemsComponent },
      { path: "invoices", component: InvoicesComponent },
      {
        path: "addItems",
        component: AdditemsComponent,
        // canDeactivate: [AuthGuard],
      },
      { path: "jobs", component: JobsComponent },
      { path: "jobsadd/:id", component: JobsaddComponent },
      { path: "popupmodal", component: PopUpModalComponent },
    ],
  },
  { path: "", component: MiddlewareComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
exports: [RouterModule],
})
export class AppRoutingModule {}
