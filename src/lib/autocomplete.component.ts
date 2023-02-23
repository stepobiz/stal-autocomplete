import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
	selector: 'stal-autocomplete',
	template: `
    <div class="stal-autocomplete wrapper" *ngIf="show">
      <div *ngFor="let element of filteredElements | async" (click)="select(element)">{{ displayFn(element) }}</div>
    </div>
  `,
	styles: [`
    .stal-autocomplete, .wrapper {
      position: fixed;
      background-color: #aaa;
    }
    .stal-autocomplete {
      z-index: 999999;
    }
  `]
})
export class StalAutocompleteComponent {
	@Input() filteredElements: Observable<any[]> | undefined;
	@Input() input: HTMLInputElement | undefined;

	@Input() displayFn: Function = (selectedElement: any) => {
		return selectedElement.description;
	};

	selectedElementObservable: Observable<any>;
	private selectedElement$ = new Subject<any>();
	protected show: boolean = false;

	constructor() {
		this.selectedElementObservable = this.selectedElement$.asObservable();
	}

	select(e: any) {
		this.selectedElement$.next(e);
	}

	showOptions(show: boolean) {
		this.show = show;
	}
}