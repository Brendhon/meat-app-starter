import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from "@angular/router";
import { OrderComponent } from "./order.component";

@Injectable()
export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {
  canDeactivate(
    component: OrderComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
  ): boolean {
    if (!component.isOrderCompleted()) {
      return window.confirm("Deseja desistir da compra?");
    } else {
      return true;
    }
  }
}
