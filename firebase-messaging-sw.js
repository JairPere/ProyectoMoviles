importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Inicializar Firebase en el Service Worker usando la configuración de tu proyecto
firebase.initializeApp({
    apiKey: "AIzaSyAGi_3yUJvmrgEE39W2DGvNa6pUKSeKiU4",
    authDomain: "climaapps.firebaseapp.com",
    projectId: "climaapps",
    storageBucket: "climaapps.firebasestorage.app",
    messagingSenderId: "501241458768",
    appId: "1:501241458768:web:5c75d5692ceb0870052155",
    measurementId: "G-1F5636V8PM",
    vapidKey: "BCGQZikarWKBLXGt6aGBerQ2lDuQ9PiPDbVUtd4BTQHMQ6vSIyS13688hnrDDWcmsMk15RZjBtLM9AdFAYeR-Cs",
});

// Recuperar una instancia de Firebase Messaging para manejar mensajes en segundo plano
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icon/favicon.png' // Icono de notificación
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});