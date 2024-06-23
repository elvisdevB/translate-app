import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes : Routes = [
  {
    path:'',
    loadComponent : () => import('./modules/translator/pages/translate/translate.component').then( c => c.TranslateComponent)
  },
  {
    path: '**',
    redirectTo:''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
