import { LOCALE_ID, NgModule, importProvidersFrom } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations"
import { AppRoutingModule } from "./app-routing.module";
@NgModule({
  declarations:[
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    provideHttpClient(),
    provideAnimations(),

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
