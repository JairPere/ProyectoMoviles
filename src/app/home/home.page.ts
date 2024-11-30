import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PushNotificationService } from '../services/push-notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  mostrarNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('¡Hola Notificaciones de SofwareApp!', {
        body: 'Resiviras informacion sobre nuevos productos.',
      });
    } else {
      console.log('No se puede mostrar la notificación. Permiso no concedido.');
    } 
  }
  ngOnInit() {
    // Solicita permisos de notificación
    this.pushNotificationService.requestPermission();
  
    // Escucha mensajes push
    this.pushNotificationService.listen();
  
  }
  

  constructor(private pushNotificationService: PushNotificationService) {}

}
