import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StalAutocompleteComponent } from './autocomplete.component';

@Directive({
	selector: '[stalAutocomplete]'
})
export class StalAutocompleteDirective implements OnInit, OnDestroy {
	@Input() stalAutocomplete: StalAutocompleteComponent | undefined;

	/*
	@Input() displayFn: Function = (selectedElement: any) => {
		return selectedElement.description;
	};
	*/

	constructor(
		private el: ElementRef,
		private ngControl: NgControl,
	) { }

	destroyer: Subscription[] = [];

	ngOnInit() {
		if (this.stalAutocomplete === undefined) throw new Error('stalAutocomplete param is required');

		// Prepare variables
		let inputElement: HTMLInputElement = this.el.nativeElement;

		let form: FormGroup;
		let controlName: string;
		{
			let formControlName: any = this.ngControl;
			form = formControlName._parent.form;
			controlName = formControlName.name;
		}

		// On start
		if (form.value[controlName] !== undefined) {
			if (form.value[controlName] != null) {
				inputElement.value = this.stalAutocomplete.displayFn(form.value[controlName]);
			}
		}

		// On Edit event
		this.destroyer.push(this.stalAutocomplete.selectedElementObservable.subscribe(
			(selectedElement) => {
				{
					let patch: any = {};
					patch[controlName] = selectedElement;
					form.patchValue(patch);
				}
				if (this.stalAutocomplete === undefined) throw new Error('stalAutocomplete param is required'); // Only for warn
				inputElement.value = this.stalAutocomplete.displayFn(selectedElement);
			}
		));
	}

	@HostListener('focus', ['$event']) onFocus(e: any) {
		setTimeout(() => {
			if (this.stalAutocomplete === undefined) throw new Error('stalAutocomplete param is required');
			this.stalAutocomplete.showOptions(true);
		}, 200);
	}

	@HostListener('focusout', ['$event']) onFocusOut(e: any) {
		setTimeout(() => {
			if (this.stalAutocomplete === undefined) throw new Error('stalAutocomplete param is required');
			this.stalAutocomplete.showOptions(false);
		}, 200);
	}

	ngOnDestroy() {
		this.destroyer.forEach(s => s.unsubscribe());
	}
}