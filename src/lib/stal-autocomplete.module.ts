import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StalAutocompleteComponent } from './stal-autocomplete.component';
import { StalAutocompleteDirective } from './stal-autocomplete.directive';



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
