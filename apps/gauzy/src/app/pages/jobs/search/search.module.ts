import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { I18nTranslateModule } from '@gauzy/ui-sdk/i18n';
import { SharedModule } from '../../../@shared/shared.module';
import {
	NbButtonModule,
	NbCardModule,
	NbIconModule,
	NbInputModule,
	NbPopoverModule,
	NbSelectModule,
	NbSpinnerModule,
	NbToggleModule
} from '@nebular/theme';
import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeMultiSelectModule } from '../../../@shared/employee/employee-multi-select/employee-multi-select.module';
import { StatusBadgeModule } from '../../../@shared/status-badge/status-badge.module';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { DialogsModule } from '@gauzy/ui-sdk/shared';
import { GauzyButtonActionModule } from '@gauzy/ui-sdk/shared';
import { NbTabsetModule } from '@nebular/theme';
import { PaginationV2Module } from '@gauzy/ui-sdk/shared';

@NgModule({
	declarations: [SearchComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MomentModule,
		NbButtonModule,
		NbCardModule,
		NbIconModule,
		NbInputModule,
		NbPopoverModule,
		NbSelectModule,
		NbSpinnerModule,
		NbTabsetModule,
		NbToggleModule,
		Angular2SmartTableModule,
		SearchRoutingModule,
		I18nTranslateModule.forChild(),
		SharedModule,
		DialogsModule,
		EmployeeMultiSelectModule,
		StatusBadgeModule,
		GauzyButtonActionModule,
		PaginationV2Module
	]
})
export class SearchModule {}
