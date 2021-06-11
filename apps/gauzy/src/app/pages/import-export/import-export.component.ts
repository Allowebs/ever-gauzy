import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IUser, IUserRegistrationInput, PermissionsEnum } from '@gauzy/contracts';
import { ExportAllService } from '../../@core/services/export-all.service';
import { environment } from './../../../environments/environment';
import { Environment } from './../../../environments/model';
import { GauzyCloudService, Store } from '../../@core/services';
import { TranslationBaseComponent } from '../../@shared/language-base/translation-base.component';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'ngx-import-export',
	templateUrl: './import-export.html'
})
export class ImportExportComponent extends TranslationBaseComponent implements OnInit {

	user: IUser;
	environment: Environment = environment;
	permissionsEnum = PermissionsEnum;
	
	constructor(
		private readonly exportAll: ExportAllService,
		private readonly gauzyCloudService: GauzyCloudService,
		private readonly router: Router,
		private readonly store: Store,
		readonly translateService: TranslateService
	) {
		super(translateService);
	}

	ngOnInit() {
		this.store.user$
			.pipe(
				filter((user) => !!user),
				tap((user: IUser) => (this.user = user)),
				untilDestroyed(this)
			)
			.subscribe();
	}

	importPage() {
		this.router.navigate(['/pages/settings/import-export/import']);
	}

	exportPage() {
		this.router.navigate(['/pages/settings/import-export/export']);
	}

	onDownloadTemplates() {
		this.exportAll
			.downloadTemplates()
			.pipe(untilDestroyed(this))
			.subscribe((data) => saveAs(data, `template.zip`));
	}

	/*
	* Migrate Self Hosted to Gauzy Cloud Hosted
	*/
	onMigrateIntoCloud(password: string) {
		const { firstName, lastName, email } = this.user;
		const payload: IUserRegistrationInput = {
			user: { 
				firstName, 
				lastName, 
				email 
			},
			password
		}

		this.gauzyCloudService.migrateIntoCloud(payload)
			.pipe(
				untilDestroyed(this)
			)
			.subscribe();
	}
}
