import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  contactoEmail: string = '';

  constructor() { }

  ngOnInit() {
    // Lógica para inicializar la variable de correo
    this.contactoEmail = 'Software@gmail.com';
  }

}
