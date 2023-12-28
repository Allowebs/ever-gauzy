import { Component } from '@angular/core';

@Component({
	template: `<div>{{address}}</div> `
})
export class ContactRowComponent {
	value: any;
	rowData: any;

	get address() {

		if (!this.value) return '-';

		let props = [];

		for (const property in this.value) {
			if (!['country', 'city', 'address'].includes(property)) continue;
			props.push(this.value[property]);
		}

		return props.filter(p => !!p).join(', ');
	}
}
