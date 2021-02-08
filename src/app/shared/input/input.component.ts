import { Component, ContentChild, Input, OnInit, AfterContentInit } from "@angular/core";
import { NgModel } from "@angular/forms";

@Component({
  selector: "mt-input-container",
  templateUrl: "./input.component.html",
})
export class InputComponent implements OnInit, AfterContentInit {
  input: any;

  @Input()
  label: string;

  @Input()
  errorMessage: string;

  // Pegar a referencia para um atributo filho, neste caso será o NgModel
  @ContentChild(NgModel) model: NgModel

  constructor() {}
   
  // Ele será chamado assim que o conteúdo for definido
  ngAfterContentInit(): void {
    this.input = this.model
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado como uma diretiva NgModel')
    }
  }

  ngOnInit() {
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }
}
