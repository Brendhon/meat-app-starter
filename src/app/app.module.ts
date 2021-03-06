import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, LOCALE_ID, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ROUTES } from "../app/app.routes";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantComponent } from "./restaurants/restaurant/restaurant.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { ShoppingCartComponent } from "./restaurant-detail/shopping-cart/shopping-cart.component";
import { MenuItemComponent } from "./restaurant-detail/menu-item/menu-item.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { SharedModule } from "./shared/shared.module";
import { NotFoundComponent } from "./not-found/not-found.component";
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from "@angular/common";
import locatePt from '@angular/common/locales/pt'

// Definindo o localização padrão
registerLocaleData(locatePt, 'pt')

import { LoginComponent } from './security/login/login.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { ApplicationErrorHandler } from "./app.error-handler";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
    NotFoundComponent,
    LoginComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // Para que tenhamos as animações na aplicação inteira

    // PreloadAllModules - Faz com que os Lazy Loading sejam carregados em paralelos e não apenas quando são abertas
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),

    // Como foi importado o FormsModule e outros, não é necessário importa-los novamente
    SharedModule.forRoot(),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt",
    },
    {
      // Utilizar a estrategia de Hash para a navegação
      provide: LocationStrategy,
      useClass: HashLocationStrategy, 
    },
    {
      // Utilizar o nosso ErrorHandler
      provide: ErrorHandler,
      useClass: ApplicationErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
