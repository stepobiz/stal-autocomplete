import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
	selector: 'stal-autocomplete',
	template: `
	<div class="stal-autocomplete wrapper" *ngIf="show">
		<div *ngIf="state == 'loading'">LOADING</div>
	  	<div *ngIf="state == 'empty'">NO RESTULT</div>
		<div *ngFor="let element of elements" (click)="select(element)">{{ displayFn(element) }}&nbsp;</div>
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
export class StalAutocompleteComponent implements OnInit {
	@Input() filteredElements: Observable<any[]> | undefined;

	@Input() displayFn: Function = (selectedElement: any) => {
		return selectedElement[Object.keys(selectedElement)[1]];
	};

	selectedElementObservable: Observable<any>;
	private selectedElement$ = new Subject<any>();
	protected elements: any[] = [];
	protected show: boolean = false;
	protected state = 'loading';

	constructor() {
		this.selectedElementObservable = this.selectedElement$.asObservable();
	}

	ngOnInit() {
		if (this.filteredElements === undefined) throw new Error('filteredElements param is required (001)');

		this.filteredElements.subscribe(
			(elements: any[]) => {
				this.elements = elements;
				this.state = 'result'
				if(this.elements.length < 1) {
					this.state = 'empty';
				}
			}
		)
	}

	select(e: any) {
		this.selectedElement$.next(e);
	}

	showOptions(show: boolean) {
		this.show = show;
	}
}