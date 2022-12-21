import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StalAutocompleteComponent } from './autocomplete.component';
import { StalAutocompleteDirective } from './autocomplete.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    StalAutocompleteComponent,
    StalAutocompleteDirective,
  ],
  exports: [
    StalAutocompleteComponent,
    StalAutocompleteDirective,
  ]
})
export class StalAutocompleteModule { }
