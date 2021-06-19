import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomeComponent } from './home/home.component';
import { LanguageComponent } from './language/language.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: ':lang', component: LanguageComponent,
    children: [
      { path: 'home/:page', component: HomeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'add-product', component: AddProductComponent},
      { path: 'edit-product/:id', component: EditProductComponent},
      { path: "",   redirectTo: 'home/1', pathMatch: 'full' }
    ]
  },
  { path: "",   redirectTo: 'ru', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
