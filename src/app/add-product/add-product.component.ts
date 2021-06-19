import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import form from "../../forms/interaction-forms.json";
import { Product } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageComponent } from '../language/language.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  private urlRest = "/api/product/set"

  public lang: any = null;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }
  
  public labelform = form;

  public product: Product = null;

  base64Length: number[] = [0];
  typeLength: number[] = [0];
  volumeLength: number[] = [0];

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private languageComponent: LanguageComponent) {
     
   }
   
   productClear(){
    this.product = {
      id: 0,
      base64:[""],
      price: {"EUR": 0},
      type:[""],
      name: {"en": "", "ru": "", "uk": ""},
      brand: "",
      volume:[""],
      age:"",
      description: {"en": "", "ru": "", "uk": ""},
      applying: {"en": "", "ru": "", "uk": ""},
      madeIn:{"en": "", "ru": "", "uk": ""},
      countryTM:{"en": "", "ru": "", "uk": ""},
      appointment:{"en": "", "ru": "", "uk": ""},
      applicationTime:{"en": "", "ru": "", "uk": ""},
      gender:{"en": "", "ru": "", "uk": ""},
      classification:{"en": "", "ru": "", "uk": ""}
    }
   }

   setLang(lang){
     this.lang = lang;
   }

   addImages(){
    let array = [];
    for(let i = 0; i <= (this.base64Length.length); i++){
      array.push(i);
    }
    this.base64Length = array;
   }

   deleteImagesById(id){
    let array = [];
    for(let i = 0; i <= (this.base64Length.length - 2); i++){
      array.push(i);
    }
    this.base64Length = array;

    this.product.base64 = this.product.base64.slice(0, id).concat(this.product.base64.slice(id + 1, this.product.base64.length));
   }

   addType(){
    let array = [];
    for(let i = 0; i <= (this.typeLength.length); i++){
      array.push(i);
    }
    this.typeLength = array;
  }

  deleteTypeById(id){
    let array = [];
    for(let i = 0; i <= (this.typeLength.length - 2); i++){
      array.push(i);
    }
    this.typeLength = array;

    this.product.type = this.product.type.slice(0, id).concat(this.product.type.slice(id + 1, this.product.type.length));
  }

   addVolume(){
    let array = [];
    for(let i = 0; i <= (this.volumeLength.length); i++){
      array.push(i);
    }
    this.volumeLength = array;
  }
   
  deleteVolumeById(id){
    let array = [];
    for(let i = 0; i <= (this.volumeLength.length - 2); i++){
      array.push(i);
    }
    this.volumeLength = array;

    this.product.volume = this.product.volume.slice(0, id).concat(this.product.volume.slice(id + 1, this.product.volume.length));
  }

   changeFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

   uploadFile(event, id) {
    if (event.target.value) {
        const file = event.target.files[0];
        const type = file.type;
        this.changeFile(file).then((base64: string): any => {
            this.product.base64[id] = base64;
        });
    } else alert('Please set Images')
}

addProduct() {
  return this.httpClient.post<Product>(this.urlRest, this.product, this.httpOptions).subscribe(product =>{
    product = this.product;
      catchError(error => {
         return throwError('[ERROR] assing product');
      })
      this.productClear();
    });
} 

  ngOnInit(): void {

    this.lang = this.languageComponent.lang;  
    this.productClear();
    
  }

}
