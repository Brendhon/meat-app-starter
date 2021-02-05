import { Component, OnInit } from "@angular/core";
import { Restaurant } from "./restaurant/restaurant.model";
import { RestaurantService } from "./restaurants.service";

@Component({
  selector: "mt-restaurants",
  templateUrl: "./restaurants.component.html",
})
export class RestaurantsComponent implements OnInit {
  // Declarando uma lista de restaurantes
  restaurants: Restaurant[];

  constructor(private restaurantsService: RestaurantService) {}

  ngOnInit() { 
    this.restaurants = this.restaurantsService.getRestaurants()
  }
}
