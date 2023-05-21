import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter } from '@angular/router';
import { authInterceptor } from './app/interceptors/authinterceptor';
import { baseUrlInterceptor } from './app/interceptors/baseUrlInterceptor';
import { APP_ROUTES } from './app/routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

//bootstrapApplication(AppComponent).catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor ])),
    provideRouter(APP_ROUTES),
    importProvidersFrom(BrowserAnimationsModule),

],
}).catch((e) => console.error(e));

