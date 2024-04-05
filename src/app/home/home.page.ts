import { Component, OnInit } from '@angular/core';
import { Database, object, ref } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  thermometerTemperature: number =0; // No necesitas asignar un valor inicial aquí, ya que lo establecerás desde la base de datos
  valores_db: any; // Declaración de la variable global valores_db

  constructor(private database: Database) {}

  ngOnInit() {
    const route = ref(this.database, "/termo");
    object(route).subscribe(attributes => {
      this.valores_db = attributes.snapshot.val(); // Asignación a la variable global
      console.log(this.valores_db); // Imprimir valores obtenidos de la búsqueda en la ruta 
      
      // Asigna valores_db a thermometerTemperature
      this.thermometerTemperature = this.calculateTemperature(this.valores_db.termome);
    });
  }
  
  calculateTemperature(temperature: number): number {
    // Limita el valor máximo a 100
    const limitedTemperature = temperature > 100 ? 100 : temperature;
    return limitedTemperature / 100;
  }
  
}
