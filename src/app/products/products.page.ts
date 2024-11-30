import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];  // Arreglo para almacenar los productos desde la base de datos
  cart: Product[] = [];      // Carrito de compras

  private stripe: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Llamada HTTP para obtener productos desde la API PHP
    this.http.get<Product[]>('http://localhost/software_store_api/getProducts.php').subscribe(
      (data) => {
        this.products = data; // Asignamos los productos obtenidos al arreglo "products"
        console.log('Productos cargados:', this.products);  // Verifica en la consola
      },
      (error) => {
        console.error('Error al cargar los productos:', error);  // Si hay error, lo mostramos en consola
      }
    );
    this.initializeStripe();
  }

  // Función para inicializar Stripe
  initializeStripe() {
    loadStripe('pk_test_51QHNBLD6FcL1O0NLdrVjJXPPqivmcZmeQvAAZE0YrPHcHhSgUlUnlj7CefwuFnHjcBuh0ZUo2szdqrz6P7JkD9dX00Ge93q89i').then((stripe) => {
      this.stripe = stripe;
    });
  }

  // Función para agregar un producto al carrito
  addToCart(product: Product) {
    this.cart.push(product);
    console.log('Producto agregado al carrito:', product);
    console.log('Carrito actual:', this.cart);
  }

  // Función para realizar el checkout (proceso de pago)
  async checkout(product: Product) {
    try {
      const response = await this.http.post<{ id: string }>('http://localhost/software_store_api/createCheckoutSession.php', {
        price: product.price
      }).toPromise();

      if (response && response.id) {
        const sessionId = response.id;

        // Redirigir a Stripe Checkout
        const result = await this.stripe.redirectToCheckout({ sessionId });

        if (result.error) {
          console.error(result.error.message);
        }
      } else {
        console.error('La sesión de pago no se creó correctamente.', response);
      }
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error);
    }
  }

  // Función para cerrar sesión
  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  // Función para ver el carrito
  viewCart() {
    this.router.navigate(['/cart'], {
      state: {
        cart: this.cart
      }
    });
  }
}
