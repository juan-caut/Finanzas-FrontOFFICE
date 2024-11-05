import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent,  {
  providers: [
    provideRouter(routes),
    provideHttpClient() // Usa provideHttpClient en lugar de HttpClientModule
  ]
}).catch((err) => console.error(err));

