import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageComponent } from '../language/language.component';
import { Product, ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

import form from "../../forms/interaction-forms.json";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private lastId = 0;
  private amountProductsOnPage = 12;
  private pagesRange: number = 10

  private snackBarDuration: number = 2000;

  public labelForm = form;

  public maxPages: number = 0;
  public currentPage: number = 0;
  public pages: Array<number> = []

  public productList: Array<Product> = [];
  public form: Product = null;
  public lang = "en";

  public loading: boolean = false;

  private productsSubscription: Subscription;
  private snackBarSubscription: Subscription;

  constructor(
      private languageComponent: LanguageComponent,
      private dialog: MatDialog,
      private snackBar: MatSnackBar,
      private activatedRouter: ActivatedRoute,
      private router: Router, 
      private productService: ProductService
              ) {}

  public setLang(lang):void {
    this.router.navigate([lang, 'home', this.currentPage]);
    this.lang = lang;
  }

  private pageUpdate(){
    if(+this.maxPages > this.pagesRange){
      let halfPageRange = Math.ceil(this.pagesRange/2);
      if(Math.ceil(this.pagesRange/2) < this.currentPage && (this.maxPages - halfPageRange) > this.currentPage){
        this.pages = [];
        for(let i = this.currentPage-(halfPageRange); i <= +this.currentPage + (+halfPageRange-1); i++){
          this.pages.push(i);
        }
      }else {
        let startNumber = 0;
        if(this.currentPage < +halfPageRange+1) {
          startNumber = 1;
        }else {
          startNumber = +this.maxPages - (+this.pagesRange-1);
          console.log(startNumber = +this.maxPages - (+this.pagesRange-1));
        }
        this.pages = [];
        for(let i = startNumber; i < (this.pagesRange + startNumber); i++){
          this.pages.push(i);
        }
      }
    }else{
      this.pages = [];
      for(let i = 1; i <= +this.maxPages; i++){
        this.pages.push(i);
      }
    }
}

  public setPage(page: number): void{
    this.loading = true;
    this.currentPage = page;
    this.getProductByPage(this.currentPage);
  }

  public previous(): void{
    if(this.currentPage > 0){
      this.loading = true;
      this.currentPage--;
      this.getProductByPage(this.currentPage);
    }else{
      console.log("Null!!!")
    }
  }

  public next(): void{ 
    if(+this.currentPage <= this.maxPages){
      this.loading = true;
      this.currentPage++;
      this.getProductByPage(this.currentPage);
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.snackBarDuration,
      panelClass: ['color-snackbar']
    });
  }

  private delete(id){

  }

  public deleteDialog(idProduct: number): void{
    const _productInfo = "[ID: " + this.productList[idProduct].id + "] " + this.productList[idProduct].brand;
    let dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '300px',
      data: {
       lang: this.lang,
       title: this.labelForm.deleteConfirm[this.lang]
      }
      });
      if(this.snackBarSubscription){
        this.snackBarSubscription.unsubscribe();
      }
      this.snackBarSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          // let product: Observable<Product> = this.productList[idProduct];
          console.log( );
          this.openSnackBar(_productInfo + " " + this.labelForm.deleted[this.lang], "ОК");
          this.productList.splice(idProduct, 1);
        } else{
          console.log("canceled!");
          this.openSnackBar(this.labelForm.canceled[this.lang], "ОК");
        }
      });
     
  }

  public getProductByPage(page): void{
    this.pageUpdate();
    this.productList = [];
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }  
    this.productsSubscription = this.productService.getProductByPages(page, this.amountProductsOnPage).subscribe((array: Array<Product>)=>{
      this.productList = array;
      this.router.navigate([this.languageComponent.lang, 'home', this.currentPage]);
      this.loading = false;
    });   
  }

  ngOnInit(): void {
    this.loading = true;
    this.lang = this.languageComponent.lang;
    this.productService.getLastid().subscribe((lastId: number)=>{
      this.lastId = lastId;
      this.maxPages = Math.ceil(this.lastId/this.amountProductsOnPage);
      this.currentPage = this.activatedRouter.snapshot.params['page'];
      this.pageUpdate();
      this.getProductByPage(this.currentPage);
    }); 
  }

}
