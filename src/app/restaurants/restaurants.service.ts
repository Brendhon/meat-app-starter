import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Restaurant } from "./restaurant/restaurant.model";

import { MEAT_API } from "../app.api";
import { ErrorHandler } from "../app.error-handler";

@Injectable()
export class RestaurantService {
  constructor(private http: Http) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get(`${MEAT_API}/restaurants`)
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
}
