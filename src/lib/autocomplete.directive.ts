import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StalAutocompleteComponent } from './autocomplete.component';

@Directive({
	selector: '[stalAutocomplete]'
})
export class StalAutocompleteDirective implements OnInit, OnDestroy {
	@Input() stalAutocomplete: StalAutocompleteComponent | undefined;

	constructor(
		private el: ElementRef,
		private ngControl: NgControl,
	) { }

	destroyers: Subscription[] = [];

	ngOnInit() {
		if (this.stalAutocomplete === undefined) throw new Error('stalAutocomplete param is required (001)');

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
				setTimeout(() => {
					if (this.stalAutocomplete === undefined) throw new Error('stalAutocomplete param is required (002)');
					inputElement.value = this.stalAutocomplete.displayFn(form.value[controlName]);	
				}, 1);
			}
		}

		// On Edit event
		let destroyer = this.stalAutocomplete.selectedElementObservable.subscribe(
			(selectedElement) => {
				{
					let patch: any = {};
					patch[controlName] = selectedElement;
					form.patchValue(patch);
				}
				if (this.stalAutocomplete === undefined) throw new Error('stalAutocomplete param is required (002)'); // Only for warn
				inputElement.value = this.stalAutocomplete.displayFn(selectedElement);
			}
		);

		this.destroyers.push(destroyer);
	}

	@HostListener('focus', ['$event']) onFocus(e: any) {
		setTimeout(() => {
			if (this.stalAutocomplete === undefined) throw new Error('stalAutocomplete param is required (003)');
			this.stalAutocomplete.showOptions(true);
		}, 1);
	}

	@HostListener('focusout', ['$event']) onFocusOut(e: any) {
		setTimeout(() => {
			if (this.stalAutocomplete === undefined) throw new Error('stalAutocomplete param is required (004)');
			this.stalAutocomplete.showOptions(false);
		}, 200);
	}

	ngOnDestroy() {
		this.destroyers.forEach(s => s.unsubscribe());
	}
}