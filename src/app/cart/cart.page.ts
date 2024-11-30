import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: any[] = [];  // Arreglo que contendrá los productos en el carrito
  total: number = 0;  // Total a pagar

  constructor(private router: Router) {}

  ngOnInit() {
    // Verificamos si el estado del carrito está disponible
    if (history.state.cart) {
      this.cart = history.state.cart.map((item: any) => {
        return {
          ...item,
          price: parseFloat(item.price)  // Convierte el precio a número
        };
      });
      this.calculateTotal();  // Calculamos el total al cargar el carrito
    }
  }

  // Función para calcular el total a pagar
  calculateTotal() {
    this.total = this.cart.reduce((sum, item) => sum + item.price, 0);  // Suma todos los precios de los productos
  }
  

  goToPayment() {
    // Redirige a la página de pago, pasando los productos y el total como parámetros
    this.router.navigate(['/paypal-payment'], {
      state: { cart: this.cart, total: this.total }
    });
  }
}
