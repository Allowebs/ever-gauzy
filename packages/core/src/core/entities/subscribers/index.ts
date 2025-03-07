export * from './base-entity-event.subscriber';
export * from './tenant-organization-base-entity.subscriber';

import { MultiORMEnum, getORMType } from '../../utils';
import {
	ActivitySubscriber,
	ActivityLogSubscriber,
	CandidateSubscriber,
	CustomSmtpSubscriber,
	EmailResetSubscriber,
	EmailTemplateSubscriber,
	EmployeeSubscriber,
	FeatureSubscriber,
	ImageAssetSubscriber,
	ImportHistorySubscriber,
	IntegrationSettingSubscriber,
	IntegrationSubscriber,
	InviteSubscriber,
	InvoiceSubscriber,
	IssueTypeSubscriber,
	OrganizationContactSubscriber,
	OrganizationDocumentSubscriber,
	OrganizationProjectSubscriber,
	OrganizationSubscriber,
	OrganizationTeamEmployeeSubscriber,
	OrganizationTeamJoinRequestSubscriber,
	OrganizationTeamSubscriber,
	PaymentSubscriber,
	PipelineSubscriber,
	ProductCategorySubscriber,
	ReportSubscriber,
	RoleSubscriber,
	ScreenshotSubscriber,
	TagSubscriber,
	TaskPrioritySubscriber,
	TaskRelatedIssueTypeSubscriber,
	TaskSizeSubscriber,
	TaskStatusSubscriber,
	TaskSubscriber,
	TaskVersionSubscriber,
	TenantSubscriber,
	TimeOffRequestSubscriber,
	TimeSlotSubscriber,
	UserSubscriber
} from '../internal';
import { TenantOrganizationBaseEntityEventSubscriber } from './tenant-organization-base-entity.subscriber';

const ormType = getORMType();

/**
 * A map of the core TypeORM / MikroORM Subscribers.
 */
export const coreSubscribers = [
	// Add the subscriber only if the ORM type is MikroORM
	...(ormType === MultiORMEnum.MikroORM ? [TenantOrganizationBaseEntityEventSubscriber] : []),
	ActivitySubscriber,
	ActivityLogSubscriber,
	CandidateSubscriber,
	CustomSmtpSubscriber,
	EmailResetSubscriber,
	EmailTemplateSubscriber,
	EmployeeSubscriber,
	FeatureSubscriber,
	ImageAssetSubscriber,
	ImportHistorySubscriber,
	IntegrationSettingSubscriber,
	IntegrationSubscriber,
	InviteSubscriber,
	InvoiceSubscriber,
	IssueTypeSubscriber,
	OrganizationContactSubscriber,
	OrganizationDocumentSubscriber,
	OrganizationProjectSubscriber,
	OrganizationSubscriber,
	OrganizationTeamEmployeeSubscriber,
	OrganizationTeamJoinRequestSubscriber,
	OrganizationTeamSubscriber,
	PaymentSubscriber,
	PipelineSubscriber,
	ProductCategorySubscriber,
	ReportSubscriber,
	RoleSubscriber,
	ScreenshotSubscriber,
	TagSubscriber,
	TaskPrioritySubscriber,
	TaskRelatedIssueTypeSubscriber,
	TaskSizeSubscriber,
	TaskStatusSubscriber,
	TaskSubscriber,
	TaskVersionSubscriber,
	TenantSubscriber,
	TimeOffRequestSubscriber,
	TimeSlotSubscriber,
	UserSubscriber
];
