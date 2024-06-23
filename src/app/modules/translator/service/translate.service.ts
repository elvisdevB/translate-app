import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class TranslateService{

  constructor( private http : HttpClient){}

  translateText(text : string , idiomaPrincipal : string, idiomaSecundario : string){
    const res = this.http.get(`https://api.mymemory.translated.net/get?q=${text}&langpair=${idiomaPrincipal}|${idiomaSecundario}`)

    return res
  }
}
