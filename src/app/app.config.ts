import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClient, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'primer-parcial-labo4-1e3ec',
        appId: '1:182249408418:web:290553d79ae0ecbfb094fb',
        storageBucket: 'primer-parcial-labo4-1e3ec.appspot.com',
        apiKey: 'AIzaSyBOtmnKdtZ--77e3VeEcNpYvdX6CXtVVHo',
        authDomain: 'primer-parcial-labo4-1e3ec.firebaseapp.com',
        messagingSenderId: '182249408418',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
