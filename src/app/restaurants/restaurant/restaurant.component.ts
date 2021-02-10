import { Component, Input, OnInit } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Restaurant } from "./restaurant.model";

@Component({
  selector: "mt-restaurant",
  templateUrl: "./restaurant.component.html",
  animations: [
    trigger("restaurantAppeared", [
      state("ready", style({ opacity: 1 })),
      // Void => Ready - Do momento em que ele é adicionado a arvore de elementos para o state ready
      transition("void => ready", [
        style({ opacity: 0, transform: "translate(50px)" }),
        animate("500ms 0s ease-in-out"),
      ]),
    ]),
  ],
})
export class RestaurantComponent implements OnInit {
  @Input()
  restaurant: Restaurant;
  restaurantState:string;
  
  constructor() {
    this.restaurantState = 'ready'
  }
  
  ngOnInit() {
  }
}
