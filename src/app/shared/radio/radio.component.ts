import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { RadioOption } from "./radio-option.model";

@Component({
  selector: "mt-radio",
  templateUrl: "./radio.component.html",
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true,
  }],
})
export class RadioComponent implements OnInit, ControlValueAccessor {
  @Input()
  options: RadioOption[];

  value: any;

  onChange: any;

  constructor() {}

  ngOnInit() {
  }

  setValue(value: any) {
    this.value = value;
    this.onChange(this.value);
  }

  // -------Override---------
  // Escreve um novo valor para o atributo
  writeValue(obj: any): void {
    this.value = obj;
  }

  // Toda vez que o valor mudar internamente deve-se chamar essa função
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {} // Registra que o Usuário entrou no component
  setDisabledState?(isDisabled: boolean): void {} // Controla o acesso ao DISABLE
}
