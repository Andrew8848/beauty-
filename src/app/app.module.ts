import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccComponent } from './acc/acc.component';
import { ProductBlockComponent } from './product-block/product-block.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { AppService } from './services/app.service';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LanguageComponent } from './language/language.component';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    AccComponent,
    ProductBlockComponent,
    LoginComponent,
    HomeComponent,
    AddProductComponent,
    PageNotFoundComponent,
    EditProductComponent,
    LanguageComponent,
    DialogConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ],
  entryComponents: [
    DialogConfirmationComponent
  ],
  providers: [
    AppService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
