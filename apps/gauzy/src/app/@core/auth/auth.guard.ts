import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Store } from '@gauzy/ui-sdk/common';
import { AuthService, AuthStrategy, ElectronService } from '@gauzy/ui-sdk/core';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly router: Router,
		private readonly authService: AuthService,
		private readonly authStrategy: AuthStrategy,
		private readonly store: Store,
		private readonly electronService: ElectronService
	) {}

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const token = route.queryParamMap.get('token');
		const userId = route.queryParamMap.get('userId');
		if (token && userId) {
			this.store.token = token;
			this.store.userId = userId;
		}

		const isAuthenticated = await this.authService.isAuthenticated();
		if (isAuthenticated) {
			// logged in so return true
			return true;
		}

		// not logged in so redirect to login page with the return url
		if (this.electronService.isElectron) {
			try {
				this.electronService.ipcRenderer.send('logout');
			} catch (error) {}
		}

		// logout and clear local store before redirect to login page
		await firstValueFrom(this.authStrategy.logout());

		this.router.navigate(['/auth/login'], {
			queryParams: { returnUrl: state.url }
		});
		return false;
	}
}
