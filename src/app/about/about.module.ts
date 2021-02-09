import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutComponent } from "./about.component";
import { RouterModule, Routes } from '@angular/router';

// Declarando as Rotas deste Môdulo
const ROUTES: Routes = [
  {path: '', component: AboutComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES), // Utilizando "forChild" por causa de ser uma rota filha
  ],
  declarations: [
    AboutComponent,
  ],
})
export class AboutModule {}
