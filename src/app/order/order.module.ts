import { NgModule } from "@angular/core";
import { OrderComponent } from "./order.component";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";
import { SharedModule } from "app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";

// Declarando as Rotas deste Môdulo
const ROUTES: Routes = [
  { path: "", component: OrderComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [
    OrderComponent,
    OrderItemsComponent,
    DeliveryCostsComponent,
  ],
})
export class OrderModule {}
