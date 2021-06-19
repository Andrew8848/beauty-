import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
}
