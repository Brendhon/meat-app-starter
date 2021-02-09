import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InputComponent,
    RadioComponent,
    RatingComponent,
  ],
  //Exportando CommonModule, FormsModule, ReactiveFormsModule para que não seja necessário importa-los depois
  exports: [ 
    InputComponent,
    RadioComponent,
    RatingComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
