import { ICandidateInterview } from '@gauzy/contracts';
import { Component, OnDestroy, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from '@gauzy/ui-sdk/core';
import { TranslationBaseComponent } from '@gauzy/ui-sdk/shared';
import { CandidateTechnologiesService } from '../../../../@core/services/candidate-technologies.service';
import { CandidatePersonalQualitiesService } from '../../../../@core/services/candidate-personal-qualities.service';
import { CandidateInterviewersService } from '../../../../@core/services/candidate-interviewers.service';
import { CandidateInterviewService } from '../../../../@core/services/candidate-interview.service';

@UntilDestroy()
@Component({
	selector: 'ga-delete-interview',
	templateUrl: 'delete-interview.component.html',
	styleUrls: ['delete-interview.component.scss']
})
export class DeleteInterviewComponent extends TranslationBaseComponent implements OnDestroy {
	@Input() interview: ICandidateInterview;

	constructor(
		protected readonly dialogRef: NbDialogRef<DeleteInterviewComponent>,
		public readonly translateService: TranslateService,
		private readonly toastrService: ToastrService,
		private readonly candidateInterviewService: CandidateInterviewService,
		private readonly candidateTechnologiesService: CandidateTechnologiesService,
		private readonly candidatePersonalQualitiesService: CandidatePersonalQualitiesService,
		private readonly candidateInterviewersService: CandidateInterviewersService
	) {
		super(translateService);
	}

	async delete() {
		try {
			if (this.interview.personalQualities.length > 0) {
				await this.candidatePersonalQualitiesService.deleteBulkByInterviewId(this.interview.id);
			}
			if (this.interview.technologies.length > 0) {
				await this.candidateTechnologiesService.deleteBulkByInterviewId(this.interview.id);
			}
			await this.candidateInterviewersService.deleteBulkByInterviewId(this.interview.id);
			await this.candidateInterviewService.delete(this.interview.id);
			this.dialogRef.close(this.interview);
		} catch (error) {
			this.toastrError(error);
		}
	}

	private toastrError(error) {
		this.toastrService.danger(error);
	}

	closeDialog() {
		this.dialogRef.close();
	}

	ngOnDestroy(): void {}
}
