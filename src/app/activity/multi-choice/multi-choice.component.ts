import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { plus } from '../../bootstrap-icons/bootstrap-icons';

let counter = 1;

interface Option {
  value: string;
  checked: boolean;
}

@Component({
  selector: 'dn-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: ['./multi-choice.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MultiChoiceComponent), multi: true }
  ]
})
export class MultiChoiceComponent implements OnInit, ControlValueAccessor {
  @Input() knownOptions!: Array<string>;
  @Input() addText = 'Ajouter une option';

  options: Array<Option> = [];
  private onChange: (value: Array<string>) => void = () => {};
  onTouch: () => void = () => {};
  prefix = `multi-choice-${counter++}-`;
  icons = {
    plus: plus
  };

  ngOnInit(): void {
    this.options = (this.knownOptions ?? []).map(value => ({ value, checked: false }));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // not handled
  }

  writeValue(obj: Array<string> | null | undefined): void {
    const newOptions = (this.knownOptions ?? []).map(value => ({ value, checked: false }));
    obj?.forEach(value => {
      let option = newOptions.find(o => o.value === value);
      if (!option) {
        option = { value, checked: false };
        newOptions.push(option);
      }
      option.checked = true;
    });
    this.options = newOptions;
  }

  toggleOption(option: Option) {
    option.checked = !option.checked;
    const newValue = this.options.filter(o => o.checked).map(o => o.value);
    this.onChange(newValue);
  }

  addOption(value: string, input: HTMLInputElement) {
    if (value && !this.options.some(o => o.value === value)) {
      const option = { value, checked: false };
      this.options.push(option);
      this.toggleOption(option);
    }
    input.value = '';
    input.focus();
  }
}
