import { Component, OnInit } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { NotificationService } from "../notification.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/do";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "mt-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.css"],
  animations: [
    trigger("snack-visibility", [
      state(
        "hidden",
        style({
          opacity: 0,
          bottom: "0px",
        }),
      ),
      state(
        "visible",
        style({
          opacity: 1,
          bottom: "30px",
        }),
      ),
      transition("hidden => visible", animate("500ms 0s ease-in")),
      transition("visible => hidden", animate("500ms 0s ease-out")),
    ]),
  ],
})
export class SnackbarComponent implements OnInit {
  message: string = "Hello World";
  snackVisibility: string = "hidden";
  add: boolean;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // Se inscreve no Observable e quando for notificado realiza a operação
    // subscribe - Coloca um listening no Observable
    // do - Permite realizar uma ação no meio da cadeia
    this.notificationService.notifier
      .do((resp) => { // Realiza uma ação e mostra o Snackbar
        this.message = resp.message;
        this.snackVisibility = "visible";
        this.add = resp.add;
      }).switchMap((msg) => Observable.timer(3000)) // Trocar o Observable por um timer
      .subscribe((timer) => this.snackVisibility = "hidden"); // Realiza o subscribe para ouvir quando o timer terminar
  }
}
