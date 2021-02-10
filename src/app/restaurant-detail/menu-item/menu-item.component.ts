import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MenuItem } from "./menu-item.model";

@Component({
  selector: "mt-menu-item",
  templateUrl: "./menu-item.component.html",
  animations: [
    trigger("menuAppeared", [
      state("ready", style({ opacity: 1 })),
      // Void => Ready - Do momento em que ele é adicionado a arvore de elementos para o state ready
      transition("void => ready", [
        style({ opacity: 0, transform: "translateY(-20px)" }),
        animate("500ms 0s ease-in"),
      ]),
    ]),
  ],
})
export class MenuItemComponent implements OnInit {
  @Input()
  menuItem: MenuItem;

  @Output() add = new EventEmitter()


  menuItemState = 'ready'

  constructor() {}

  ngOnInit() {
  }

  emitAddEvent() {
    this.add.emit(this.menuItem)
  }
}
