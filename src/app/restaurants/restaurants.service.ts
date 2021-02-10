import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Restaurant } from "./restaurant/restaurant.model";

import { MEAT_API } from "../app.api";
import { ErrorHandler } from "../app.error-handler";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantService {
  constructor(private http: Http) {}

  getRestaurants(search?: string): Observable<Restaurant[]> {
    return this.http.get(`${MEAT_API}/restaurants`, {params: {q: search}})
      .map((resp) => resp.json())
      .catch(ErrorHandler.handleError);
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get(`${MEAT_API}/restaurants/${id}`)
      .map((resp) => resp.json())
      .catch(ErrorHandler.handleError);
  }

  getReviewsOfRestaurants(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
      .map((resp) => resp.json())
      .catch(ErrorHandler.handleError);
  }

  getMenuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
      .map((resp) => resp.json())
      .catch(ErrorHandler.handleError);
  }
}
