import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../services/product.service';
import { LanguageComponent } from '../language/language.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

import form from "../../forms/interaction-forms.json";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  public id = 0;
  public lang: any = null;

  private snackBarDuration: number = 2000;

  public product: Product = null;
  public labelform = form;

  public loading: boolean = false;

  private urlRest = "/api/product/update";

  private productsSubscription: Subscription;
  private productsSubscriptionUpdateProduct: Subscription;

  private snackBarSubscription: Subscription;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

  base64Length: number[] = [0];
  typeLength: number[] = [0];
  volumeLength: number[] = [0];

  constructor(
        private activatedRouter: ActivatedRoute,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private httpClient: HttpClient, 
        private productService: ProductService, 
        private languageComponent: LanguageComponent
    ) {}

  public setLang(lang): void{
    this.lang = lang;
  }

  private initLength(sourceArray): Array<number>{
    let array = [];
    for(let i = 0; i < (sourceArray.length); i++){
      array.push(i);
    }
    return array;
  }

  public addImages(): void{
    let array = [];
    for(let i = 0; i <= (this.base64Length.length); i++){
      array.push(i);
    }
    this.base64Length = array;
   }

  public deleteImagesById(id): void{
    let array = [];
    for(let i = 0; i <= (this.base64Length.length - 2); i++){
      array.push(i);
    }
    this.base64Length = array;
    this.product.base64 = this.product.base64.slice(0, id).concat(this.product.base64.slice(id + 1, this.product.base64.length));
  }

  public addType(): void{
    let array = [];
    for(let i = 0; i <= (this.typeLength.length); i++){
      array.push(i);
    }
    this.typeLength = array;
  }

  public deleteTypeById(id): void{
    let array = [];
    for(let i = 0; i <= (this.typeLength.length - 2); i++){
      array.push(i);
    }
    this.typeLength = array;

    this.product.type = this.product.type.slice(0, id).concat(this.product.type.slice(id + 1, this.product.type.length));
  }

  public addVolume(): void{
    let array = [];
    for(let i = 0; i <= (this.volumeLength.length); i++){
      array.push(i);
    }
    this.volumeLength = array;
  }
   
  public deleteVolumeById(id): void{
    let array = [];
    for(let i = 0; i <= (this.volumeLength.length - 2); i++){
      array.push(i);
    }
    this.volumeLength = array;

    this.product.volume = this.product.volume.slice(0, id).concat(this.product.volume.slice(id + 1, this.product.volume.length));
  }

  public changeFile(file): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  }

  public uploadFile(event, id): void {
  if (event.target.value) {
      const file = event.target.files[0];
      const type = file.type;
      this.changeFile(file).then((base64: string): any => {
          this.product.base64[id] = base64;
      });
  } else alert('Please set Images')
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.snackBarDuration,
      panelClass: ['color-snackbar']
    });
  }

  private updateProduct(): void{
    if(this.productsSubscriptionUpdateProduct){
      this.productsSubscriptionUpdateProduct.unsubscribe();
    }
    this.productsSubscriptionUpdateProduct = this.httpClient.post<Product>(this.urlRest, this.product, this.httpOptions).subscribe(product =>{
      product = this.product;
        catchError(error => {
           return throwError('[ERROR] assing product');
        })
      });
  }

  updateProductDialog(){
    const _productInfo = "[ID: " + this.product.id + "] " + this.product.brand;

    let dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '300px',
      data: {
       lang: this.lang,
       title: this.labelform.updateConfirm[this.lang]
      }
      });
    
    if(this.snackBarSubscription){
      this.snackBarSubscription.unsubscribe();
    }
    this.productsSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // let product: Observable<Product> = this.productList[idProduct];
        console.log( );
        this.openSnackBar(_productInfo + " " + this.labelform.updated[this.lang], "ОК");
      } else{
        console.log("canceled!");
        this.openSnackBar(this.labelform.updating[this.lang] + " " + this.labelform.canceled[this.lang], "ОК");
      }
    });

   
  }

  ngOnInit(): void {
    this.loading = true;
    this.lang = this.languageComponent.lang; 
    this.id = this.activatedRouter.snapshot.params['id'];
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
    this.productsSubscription = this.productService.getProductById(this.activatedRouter.snapshot.params['id']).subscribe((product: Product)=>{
      this.product = product;
      this.base64Length = this.initLength(this.product.base64);
      this.volumeLength = this.initLength(this.product.volume);
      this.typeLength = this.initLength(this.product.type);
      this.loading = false;
    }); 

  }

}
