import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Product{
  id:number;
  base64:string[];
  price;
  type:string[];
  name;
  brand:string;
  volume:string[];
  age:string;
  description;
  applying;
  madeIn;
  countryTM;
  appointment;
  applicationTime;
  gender;
  classification;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlRest: string = "/api/products/";
  private urlgetLastId: string = "lastId";

    constructor(private httpClient: HttpClient){

    }

    getLastid() :Observable<number>{
      return this.httpClient.get<number>(this.urlRest+this.urlgetLastId).pipe(
        catchError(error => {
          return throwError('[ERROR] assing product');
       })
      );
    }

    getProductById(id: number): Observable<Product>{
      return this.httpClient.get<Product>(this.urlRest+id).pipe(
        catchError(error => {
          return throwError('[ERROR] assing product');
       })
      );
    }

    getProductsWithStartAndLastId(startIndex:number, lastIndex:number): Observable<Array<Product>> {
        return this.httpClient.get<Array<Product>>(this.urlRest+startIndex+"/"+lastIndex).pipe(
          catchError(error => {
            return throwError('[ERROR] assing product');
         })
        );
      }
    
    getProductByPages(page:number, size:number){
      return this.httpClient.get<Array<Product>>(this.urlRest+"/page/"+page+"/"+size).pipe(
        catchError(error => {
          return throwError('[ERROR] assing product');
       })
      );
    }

    deleteProduct(id:number){
      return this.httpClient.get<Array<Product>>(this.urlRest+"/delete/"+id).pipe(
        catchError(error => {
          return throwError('[ERROR] assing product');
       })
      );
    }
}
