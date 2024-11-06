import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent,  {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Usa provideHttpClient en lugar de HttpClientModule
    importProvidersFrom(BrowserAnimationsModule) // Provide BrowserAnimationsModule here

  ]
}).catch((err) => console.error(err));

