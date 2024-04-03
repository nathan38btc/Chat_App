// par défault 
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';

// ajouter pour la connexion au serveur Nodejs

import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),//
    provideHttpClient(withFetch())
    ]
};
