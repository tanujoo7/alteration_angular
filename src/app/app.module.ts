import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
import { CompanyComponent } from "./components/pages/company/company.component";
import { UsersComponent } from "./components/pages/users/users.component";
import { ProductsComponent } from "./components/pages/products/products.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { ForgetPasswordComponent } from "./components/pages/forgetPassword/forgetPassword.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MiddlewareComponent } from "./components/pages/middleware/middleware.component";
import { SidebarComponent } from "./components/layouts/sidebar/sidebar.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./components/services/auth.guard";
import { ToastrModule } from "ngx-toastr";
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { AddProductsComponent } from "./components/pages/addProducts/addProducts.component";
import { AddCompanyComponent } from "./components/pages/addCompany/addCompany.component";
import { UpdateCompanyComponent } from "./components/pages/updateCompany/updateCompany.component";
import { UpdateProductsComponent } from "./components/pages/updateProducts/updateProducts.component";

import { RegistrationComponent } from "./components/pages/registration/registration.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { UpdateUserComponent } from "./components/pages/updateUser/updateUser.component";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import $ from "jquery";
import { HomeComponent } from "./components/pages/home/home.component";
import { OrganizationComponent } from "./components/pages/organization/organization.component";
import { UserAndRolesComponent } from "./components/pages/user-and-roles/user-and-roles.component";
import { ProfileComponent } from "./components/pages/profile/profile.component";
import { OrganizationProfileComponent } from "./components/pages/organization-profile/organization-profile.component";
import { SetPasswordComponent } from "./components/pages/set-password/set-password.component";
import { CustomerComponent } from "./components/pages/customer/customer.component";
import { JobsComponent } from "./components/pages/jobs/jobs.component";
import { ItemsComponent } from "./components/pages/items/items.component";
import { AddcustomerComponent } from "./components/pages/addcustomer/addcustomer.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { AdditemsComponent } from "./components/pages/additems/additems.component";
import { JobsaddComponent } from "./components/pages/jobsadd/jobsadd.component";
import { PopUpModalComponent } from "./components/pages/pop-up-modal/pop-up-modal.component";
import { InvoicesComponent } from './components/pages/invoices/invoices.component';
// import {} from "sweetalert2";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MiddlewareComponent,
    DashboardComponent,
    SidebarComponent,
    CompanyComponent,
    UsersComponent,
    ProductsComponent,
    AddProductsComponent,
    AddCompanyComponent,
    UpdateCompanyComponent,
    UpdateProductsComponent,
    RegistrationComponent,
    UpdateUserComponent,
    ForgetPasswordComponent,
    OrganizationComponent,
    UserAndRolesComponent,
    ProfileComponent,
    OrganizationProfileComponent,
    SetPasswordComponent,
    CustomerComponent,
    JobsComponent,
    ItemsComponent,
    AddcustomerComponent,
    JobsaddComponent,
    AdditemsComponent,
    PopUpModalComponent,
    InvoicesComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    SelectDropDownModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
  ],
  // exports: [NgxSpinnerModule],
  providers: [
    CompanyComponent,
    ProductsComponent,
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
