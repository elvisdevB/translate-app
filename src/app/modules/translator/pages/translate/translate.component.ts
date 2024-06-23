import { Component, inject } from '@angular/core';
import { TranslateService } from '../../service/translate.service';
import { IIdioma } from '../../interfaces/idioma.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Clipboard } from '@angular/cdk/clipboard';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    TooltipModule

  ],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css',
  providers:[MessageService]
})
export class TranslateComponent {

  textoOriginal : string = ''
  textoTraducido : string = ''
  idiomaPrincipal : string = ''
  idiomaSecundario : string = ''
  idiomaVoice : string = ''
  countsLetter : number = 0
  selectedKeyPrincipal: string | null = null;
  selectedKeySecundario: string | null = null;
  isLoading : boolean = false

  translateService = inject(TranslateService)
  messageService = inject(MessageService)

  idiomas : IIdioma[] = [
    {
      lengua:'Español',
      key:'es'
    },
    {
      lengua:'Frances',
      key :'fr'
    },
    {
      lengua:'Inglés',
      key:'en'
    }
  ]

  constructor( private clipboard : Clipboard ){}

  translateText(){
    if(this.selectedKeySecundario == null){
      this.messageService.add({
        severity:'info',
        detail:'Debe elegir un idioma para traducir'
      })
    }else if(this.selectedKeyPrincipal == null){
      this.messageService.add({
        severity:'info',
        detail:'Debe elegir el idioma original del texto'
      })
    }else{
      this.isLoading = true
      console.log(this.selectedKeyPrincipal, this.selectedKeySecundario)
      this.translateService.translateText(this.textoOriginal, <string>this.selectedKeyPrincipal, <string>this.selectedKeySecundario).subscribe({
        next:(res:any)=>{
          this.isLoading = false
          this.textoTraducido = res.matches[0].translation
        },
        error:(err:any)=>{
          this.isLoading = false
          this.messageService.add({
            severity:'error',
            detail:'Ocurrio un error al consultar con la API de traducción'
          })
        }
      })
    }
  }

  copyToClipboardTextOriginal(){
    this.clipboard.copy(this.textoOriginal);
    this.messageService.add({
      severity:'success',
      detail:'Texto copiado al portapeles'
    })
  }

  copyToClipboardTextTraducido(){
    this.clipboard.copy(this.textoTraducido);
    this.messageService.add({
      severity:'success',
      detail:'Texto copiado al portapeles'
    })
  }

  playTranslateTextOriginal(){
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(this.textoOriginal)
      utterance.lang = `${this.selectedKeyPrincipal}-${this.setIdiomaVoice(<string>this.selectedKeyPrincipal)}`; // Configurar el idioma a español
      utterance.pitch = 1; // Ajustar el tono
      utterance.rate = 1; // Ajustar la velocidad
      window.speechSynthesis.speak(utterance);
    }else{
      this.messageService.add({
        severity:'error',
        detail:'La síntesis de voz no es compatible con este navegador.'
      })
    }
  }

  playTranslateTextTraducido(){
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(this.textoTraducido)
      utterance.lang = `${this.selectedKeySecundario}-${this.setIdiomaVoice(<string>this.selectedKeySecundario)}`; // Configurar el idioma a español
      utterance.pitch = 1; // Ajustar el tono
      utterance.rate = 1; // Ajustar la velocidad
      window.speechSynthesis.speak(utterance);
    }else{
      this.messageService.add({
        severity:'error',
        detail:'La síntesis de voz no es compatible con este navegador.'
      })
    }
  }

  setIdiomaVoice(idioma : string){
    if(idioma == 'en'){
      return 'US'
    }else if(idioma == 'es'){
      return 'ES'
    }else{
      return 'FR'
    }
  }

  selectIdiomaPrinciapal(key: string) {
    this.selectedKeyPrincipal = key;
  }

  selectIdiomaSecundario(key: string) {
    this.selectedKeySecundario = key;
  }

  countsLettersAll(){
    this.countsLetter = this.textoOriginal.length
  }
}
