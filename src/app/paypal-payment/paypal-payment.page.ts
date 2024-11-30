import { Component, OnInit } from '@angular/core'; 
import { NavController } from '@ionic/angular'; // Importar NavController para la navegación
import { HttpClient } from '@angular/common/http'; // Importar HttpClient para las solicitudes HTTP

interface PayPal {
  Buttons: (options: PayPalButtonOptions) => any; // Define el tipo para la función Buttons
}

interface PayPalButtonOptions {
  createOrder: (data: any, actions: any) => any;
  onApprove: (data: any, actions: any) => any;
  onError: (err: any) => void;
}

// Extiende el objeto global 'window' para agregar 'paypal'
declare global {
  interface Window {
    paypal: PayPal;
  }
}
interface ApiResponse {
  error?: string;  // Propiedad opcional que puede existir si ocurre un error
  message?: string; // Propiedad opcional que puede contener el mensaje de éxito
}


@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.page.html',
  styleUrls: ['./paypal-payment.page.scss'],
})
export class PayPalPaymentPage implements OnInit {
  cart: any[] = []; // Productos del carrito
  total: number = 0; // Total a pagar

  constructor(private navCtrl: NavController, private http: HttpClient) {} // Inyectar NavController y HttpClient

  ngOnInit() {
    // Recuperamos el carrito y el total que pasamos desde la página de carrito
    if (history.state.cart && history.state.total) {
      this.cart = history.state.cart;
      this.total = history.state.total;
    }

    // Cargar el script de PayPal
    this.loadPayPalScript();
  }

  // Función para regresar a la página anterior (inicio o productos)
  goHome() {
    this.navCtrl.navigateBack('/cart'); // Aquí debes poner la ruta de tu página de carrito
  }

  // Cargar el script de PayPal
  loadPayPalScript() {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AQCXO3dcAItEawz8ffbH8tT1ZUUELbr4SdcVrj0o_ZQVXKmGn0wytQwaYTLJ1hWY9orwQ1EgBdDbLFmI&components=buttons'; // Asegúrate de usar tu propio client-id
    script.onload = () => this.initPayPalButton();
    document.body.appendChild(script);
  }

  // Inicializar el botón de PayPal
  initPayPalButton() {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.total.toFixed(2),  // Usamos el total calculado en el carrito
                currency_code: 'USD',  // Puedes cambiar la moneda si es necesario
              },
            }],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            this.processPayment(details); // Procesamos el pago
          });
        },
        onError: (err: any) => {
          console.error("Error de PayPal: ", err);
        },
      }).render('#paypal-button-container');  // Renderizamos el botón en el contenedor
    }
  }

  // Función para procesar el pago
  processPayment(details: any) {
    console.log('Pago completado con éxito:', details);
    alert('Pago realizado con éxito');

    // Eliminar el carrito
    this.cart = []; 

    // Actualizamos el stock en la base de datos y otras acciones
    this.updateStock();

    // Enviar correo de confirmación
    this.sendConfirmationEmail(details);
    this.goHome();
    // Recargar la página
    window.location.reload();
    
  }

  // Función para actualizar el stock de productos en la base de datos
  updateStock() {
    this.cart.forEach(product => {
      const data = {
        productId: product.id,  // Asegúrate de que cada producto tiene un ID
      };

      // Enviar la solicitud HTTP POST al API PHP
      this.http.post<ApiResponse>('http://localhost/software_store_api/updateStock.php', data).subscribe(
        (response: ApiResponse) => {
          // Ahora 'response' tiene el tipo ApiResponse, por lo que TypeScript no debería marcar un error
          if (response?.error) {
            console.error('Error al actualizar el stock:', response.error);
          } else if (response?.message) {
            console.log('Stock actualizado correctamente:', response.message);
          }
        },
        (error) => {
          console.error('Error al realizar la solicitud HTTP:', error);
        }
      );
    });
  }
  
  

  // Función para enviar un correo de confirmación con los detalles de la compra
  sendConfirmationEmail(details: any) {
    const emailContent = `
      ¡Gracias por tu compra!
      Productos comprados:
      ${this.cart.map(product => `${product.name} - ${product.price} MXN`).join('\n')}

      Total de la compra: ${this.total} MXN

      Detalles de la transacción:
      ID de Transacción: ${details.id}
      Pago completado por: ${details.payer.name.given_name}
    `;

    // Llamar al backend para enviar el correo de confirmación
    console.log('Enviando correo de confirmación...');
    // Aquí deberías hacer una solicitud HTTP a tu backend para enviar el correo
  }
}
