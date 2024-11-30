import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Firebase y AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { environment } from '../environments/environment'; // Configuración de Firebase

// Componentes y Módulos Personalizados
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module'; // Asumiendo que AdminModule existe

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase
    AngularFireAuthModule, // Soporte para autenticación
    AdminModule, // Importa tu módulo de admin
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"climaapps","appId":"1:501241458768:web:5c75d5692ceb0870052155","storageBucket":"climaapps.firebasestorage.app","apiKey":"AIzaSyAGi_3yUJvmrgEE39W2DGvNa6pUKSeKiU4","authDomain":"climaapps.firebaseapp.com","messagingSenderId":"501241458768","measurementId":"G-1F5636V8PM"})), provideMessaging(() => getMessaging())],
  bootstrap: [AppComponent],
})
export class AppModule {}
