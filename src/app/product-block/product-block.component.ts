import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LanguageComponent } from '../language/language.component';
import { Product, ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-block',
  templateUrl: './product-block.component.html',
  styleUrls: ['./product-block.component.scss']
})
export class ProductBlockComponent implements OnInit {

  private lastId = 0;
  private amountProductsOnPage = 12;
  private subscription: Subscription;
  private pagesRange: number = 10

  public maxPages: number = 0;
  public currentPage: number = 0;
  public pages: Array<number> = []

  public productList: Array<Product> = [];
  public form: Product = null;
  public lang = "en";

  public loading: boolean = false;

  private productsSubscription: Subscription;

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private productService: ProductService, private languageComponent: LanguageComponent) { 
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

  setPage(page: number): void{
    this.loading = true;
    this.currentPage = page;
    this.getProductByPage(this.currentPage);
  }

  previous(): void{
    if(this.currentPage > 0){
      this.loading = true;
      this.currentPage--;
      this.getProductByPage(this.currentPage);
    }else{
      console.log("Null!!!")
    }
  }

  next(): void{ 
    if(+this.currentPage <= this.maxPages){
      this.loading = true;
      this.currentPage++;
      this.getProductByPage(this.currentPage);
    }
  }

  getProductByPage(page): void{
    this.pageUpdate();
    this.productList = [];
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
    this.productsSubscription = this.productService.getProductsWithStartAndLastId((((this.amountProductsOnPage*page)-this.amountProductsOnPage)+1), (page*this.amountProductsOnPage)).subscribe((array: Array<Product>)=>{
      this.productList = array;
      this.router.navigate(['/home', this.currentPage]);
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
