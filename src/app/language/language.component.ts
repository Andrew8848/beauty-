import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductBlockComponent } from '../product-block/product-block.component';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  
  public lang;

  constructor(private activatedRoute : ActivatedRoute, private router: Router) {
  }

  setLang(lang): void{
    this.lang = lang;
  }

  setLangOnNavigate(lang, url): void{
    // this.router.navigate([lang], url);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params : Params) => {
      this.lang = params['lang'];
    });    
  }

}
