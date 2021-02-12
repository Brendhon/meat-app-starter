import { Component, OnInit } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

import { Restaurant } from "./restaurant/restaurant.model";
import { RestaurantService } from "./restaurants.service";

import { from, Observable } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from "rxjs/operators";

@Component({
  selector: "mt-restaurants",
  templateUrl: "./restaurants.component.html",
  animations: [
    trigger("toggleSearch", [
      state(
        "hidden",
        style({
          opacity: 0,
          "max-height": "0px",
        }),
      ),
      state(
        "visible",
        style({
          opacity: 1,
          "max-height": "70px",
          "margin-top": "20px",
        }),
      ),
      transition("* => *", [
        animate("250ms 0s ease-in-out"),
      ]),
    ]),
  ],
})
export class RestaurantsComponent implements OnInit {
  // Declarando uma lista de restaurantes
  restaurants: Restaurant[];

  searchBarState = "hidden";

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(
    private restaurantsService: RestaurantService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.searchControl = this.fb.control("");
    this.searchForm = this.fb.group({
      searchControl: this.searchControl,
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(800), // debounceTime - só chama o evento se a diferença entre dois eventos seja maior que o tempo informado
        distinctUntilChanged(), // distinctUntilChanged - só executa o chamado se os eventos forem diferentes
        switchMap((searchTerm) =>
          this.restaurantsService.getRestaurants(searchTerm)
            .pipe(
              catchError((error) => from([])), // Caso de Erro - Não avisar quebrar o valueChanges
            )
        ),
      )
      .subscribe((resp) => this.restaurants = resp);

    this.restaurantsService.getRestaurants()
      .subscribe((restaurants) => this.restaurants = restaurants);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === "hidden"
      ? "visible"
      : "hidden";
  }
}
